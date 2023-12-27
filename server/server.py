from flask import Flask

app = Flask(__name__)

#example API route
@app.route('/api/members')
def members():
    return {'members': ['Member1', 'Member2', 'Member3']}

if __name__ == '__main__':
    app.run(debug=True)