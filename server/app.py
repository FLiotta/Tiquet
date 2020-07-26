#imports
from flask import Flask, request, jsonify
from os.path import join, dirname
from dotenv import load_dotenv
from routes.auth_routes import auth
from routes.board_routes import board

#initialization
load_dotenv(join(dirname(__file__), '.env'))
app = Flask(__name__)
app.config["DEBUG"] = True

#Api initialization
app.register_blueprint(auth, url_prefix='/api')
app.register_blueprint(board, url_prefix='/api')

#bootstrap app
if __name__ == "__main__":
    app.run(debug=True)