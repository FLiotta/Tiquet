#imports
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from routes.auth_routes import auth
from routes.board_routes import board
from routes.user_routes import user
from routes.list_routes import list_
from database.db import db
import os

def register_extensions(app):
    db.init_app(app)
    cors = CORS(app)

def create_app():  
    #initialization
    app = Flask(__name__)

    #Config
    app.config["DEBUG"] = True
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
 
    #Api initialization
    api_prefix = '/api'

    app.register_blueprint(auth, url_prefix=api_prefix)
    app.register_blueprint(board, url_prefix=api_prefix)
    app.register_blueprint(user, url_prefix=api_prefix)
    app.register_blueprint(list_, url_prefix=api_prefix)

    register_extensions(app)

    return app

app = create_app()