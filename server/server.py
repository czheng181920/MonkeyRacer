import collections
import os
import pathlib
import ssl
import json
import requests
from dotenv import load_dotenv

from flask import Flask, request, session, abort, redirect, render_template, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from wordgen import get_random_words
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from models import UserAuth

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")
room_passage_map = {}
room_client_map = collections.defaultdict(int)

@socketio.on("connect")
def on_connect():
    """Event listener when client connects to the server"""
    print(request.sid)
    print("Client has connected")


@socketio.on("disconnect")
def disconnected():
    """Event listener when client disconnects to the server"""
    print("Client has disconnected")


@socketio.on("message")
def message(data):
    """Event listener for incoming messages

    Args:
        data: String message
    """
    print("received: " + str(data))
    
@socketio.on("join")
def on_join(data):
    """Event handler for when client joins a room

    Args:
        data: {
            username: String,
            room: String
        }
    """
    username = data['username']
    room = data['room']
    join_room(room)
    room_client_map[room] += 1
    emit("setup_game", room_passage_map[room], to=room)
    print(username + " has entered the room.")


@socketio.on("create_room")
def create_room(data):
    """Creates a new room

    Args:
        data: {
            room: String
        }
    """
    room = data['room']
    join_room(room)
    passage = get_random_words(10)
    room_passage_map[room] = passage
    room_client_map[room] += 1
    emit("setup_game", passage)
    print(room + " has been created.")

@socketio.on("leave")
def on_leave(data):
    """Event handler for when client leaves a room

    Args:
        data: {
            username: String,
            room: String
        
        }
    """
    username = data['username']
    room = data['room']
    leave_room(room)
    room_client_map[room] -= 1
    if (room_client_map[room] == 0):
        del room_passage_map[room]
        del room_client_map[room]
    print(username + " has left the room.")

@socketio.on("race_input")
def process_race_input(data):
    """Listens for racer input

    Args:
        data: {
            passage: String,
            input: String
        }
    """
    passage = data['passage']
    input = data['input']
    length = min(len(passage), len(input))
    for i in range(length):
        if passage[i] != input[i]:
            emit("incorrect_input", 
                {
                    'errorInd': i
                }, to=request.sid)
            return
    if (len(passage) == len(input)):
        emit("correct_input", to=request.sid)


@socketio.on("validate_room")
def validate_room(roomCode):
    """Validates a room code

    Args:
        roomCode: String
    """
    if roomCode in room_passage_map:
        emit("valid_room", to=request.sid)
    else:
        emit("invalid_room", to=request.sid)
    return

## Google O-Auth
load_dotenv()
app.secret_key = os.getenv("GOOGLE_CLIENT_SECRET")

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev

GOOGLE_CLIENT_ID =  os.getenv("GOOGLE_CLIENT_ID")
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="https://127.0.0.1:5000/login/callback"
)


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/login/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    session["email"] = id_info.get("email")

    ## Check if the user already exists?
    if UserAuth.checkUser(session["email"]):
        return redirect("/protected_area") ## User Already Exists
    else:
        return redirect("/registration") ## User does not exist
    


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/registration")
def registration():
    return render_template('registration.html') ## This will need to change to be loading into the React version

@app.route('/validate-username', methods=['GET'])
def validate_username():
    username = request.args.get('username')
    is_taken = UserAuth.checkUsername(username)
    return jsonify({'is_taken': is_taken})

@app.route('/register', methods=['POST'])
def register():
    print("register method called")
    data = request.json
    username = data['username']
    email = session["email"]
    valid = UserAuth.createUser(email, username)
    if valid:
        return jsonify(success=True, redirect_url="/protected_area")
    else:
        return jsonify(success=False, message="Registration unsuccessful")



if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)