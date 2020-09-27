#imports
from flask import Flask, request, jsonify, render_template
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
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
    limiter = Limiter(
        app,
        key_func=get_remote_address,
        default_limits=["100 per minute"]
    )

def create_app(log):  
    #initialization
    app = Flask(__name__, template_folder="templates")
    api_prefix = '/api'
    swagger = get_swaggerui_blueprint(base_url=api_prefix, api_url='/static/swagger.json')

    #Config
    app.config.from_pyfile('config.py')
 
    #Api initialization
    app.register_blueprint(swagger, url_prefix=api_prefix)
    app.register_blueprint(auth, url_prefix=api_prefix)
    app.register_blueprint(board, url_prefix=api_prefix)
    app.register_blueprint(list_, url_prefix=api_prefix)
    app.register_blueprint(task, url_prefix=api_prefix)
    app.register_blueprint(priority, url_prefix=api_prefix)

    register_extensions(app)
    return app