from flask import Flask
application = Flask(__name__)

@application.route("/")
def hello():
    return "<h2>Hello Bubba!</h2>"

if __name__ == "__main__":
    application.run()
