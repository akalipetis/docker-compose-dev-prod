import socket

from flask import Flask, Response
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, world! I\'m %s.' % socket.gethostname()
