from flask import Flask, render_template, render_template, request
from flask_socketio import SocketIO, send, emit, join_room, rooms
from coolname import generate_slug

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/seek/<room_id>')
def seek(room_id):
    return render_template("seek.html")


@app.route('/hide/<room_id>')
def hide(room_id):
    return render_template("hide.html")


@socketio.on('message', namespace="/hide")
def join_room_flask_hide(msg):
    join_room(msg)
    send("Blue player has joined the game.", room=msg, namespace="/seek")


@socketio.on('message', namespace="/seek")
def join_room_flask_seek(msg):
    join_room(msg)


@socketio.on('ss', namespace="/seek")
def ss(msg):

    emit("rh", msg[0], namespace="/hide", room=msg[1])


@socketio.on('sttsr', namespace="/seek")
def sttsr(msg):

    emit("sttcb", msg[0], namespace="/hide", room=msg[1])


@socketio.on('sttsb', namespace="/hide")
def sttsb(msg):

    emit("sttcr", msg[0], namespace="/seek", room=msg[1])


@socketio.on('sh', namespace="/hide")
def from_blue_client(msg):
    emit("rs", msg[0], namespace="/seek", room=msg[1])


#Generate slugs for game


@app.route('/slug', methods=["GET"])
def slug():
    if request.method == "GET":

        return {"game_id": generate_slug(2)}


if __name__ == '__main__':
    socketio.run(app, debug=True)
