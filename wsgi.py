from flask import Flask
application = Flask(__name__)

@application.route("/")
def hello():
    return "Hello <h2>Bubba!</h2>"

if __name__ == "__main__":
    application.run()
