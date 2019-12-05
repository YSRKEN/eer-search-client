from flask import Flask
from flask_cors import CORS

from constant import DB_NAME, SERVER_PORT
from database import Database

app = Flask(__name__)
CORS(app)

db = Database(DB_NAME)


@app.route('/')
def hello():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True, port=SERVER_PORT)
