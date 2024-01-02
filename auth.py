import os
import pathlib
import ssl
import json

import requests
from flask import Flask, session, abort, redirect, request, render_template, jsonify
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from models import UserAuth

app = Flask("Google Login App")
app.secret_key = "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"#os.environ.get("GOOGLE_CLIENT_SECRET", None)

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev

GOOGLE_CLIENT_ID =  "666060741312-1vo8j1t4ibea1q3hbn6vtitj2fbti0ci.apps.googleusercontent.com"#os.environ.get("GOOGLE_CLIENT_ID", None)
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
        return redirect("/protected_area")
    else:
        return redirect("/registration")
    


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/")
def index():
    return "Hello World <a href='/login'><button>Login</button></a>"


@app.route("/protected_area")
@login_is_required
def protected_area():
    user = UserAuth.getUsername(session["email"])
    return f"Hello {user}! <br/> <a href='/logout'><button>Logout</button></a>"

@app.route("/registration")
def registration():
    return render_template('registration.html')

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
   

if __name__ == "__main__":
    # Specify the path to your certificate and key
    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    context.load_cert_chain('server.crt', 'server.key')
    app.run(debug=True, ssl_context=context)
