#imports
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from .routes import auth, board, list_, priority, task
from .db import db
import os
from dotenv import load_dotenv
from os.path import join, dirname, abspath, pardir
from flask_swagger_ui import get_swaggerui_blueprint


load_dotenv(join(dirname(__file__), pardir, '.env'))

def register_extensions(app):
    db.init_app(app)
    cors = CORS(app)

def create_app(log):  
    #initialization
    app = Flask(__name__, template_folder="templates")

    #Config
    app.config["DEBUG"] = True
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = log
    app.config['SQLALCHEMY_ECHO'] = log
 
    #Api initialization
    api_prefix = '/api'

    swagger = get_swaggerui_blueprint(base_url=api_prefix, api_url='/static/swagger.json')
    
    app.register_blueprint(swagger, url_prefix=api_prefix)
    app.register_blueprint(auth, url_prefix=api_prefix)
    app.register_blueprint(board, url_prefix=api_prefix)
    app.register_blueprint(list_, url_prefix=api_prefix)
    app.register_blueprint(task, url_prefix=api_prefix)
    app.register_blueprint(priority, url_prefix=api_prefix)

    register_extensions(app)
    return app