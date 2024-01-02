import collections
from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from wordgen import get_random_words

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




if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)