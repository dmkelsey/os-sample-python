import socket
from flask import Flask
application = Flask(__name__)

@application.route("/")
def hello():
    return """<h1>Hello Bubba!</h1>
    <h2>from : <p style="color: purple;">%s</p> <h2>""" % socket.gethostname()

if __name__ == "__main__":
    application.run()
