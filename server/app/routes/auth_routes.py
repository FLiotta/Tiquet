from flask import jsonify, Blueprint, request, g
from ..db import db
from ..models import Users
from ..middlewares import protected_route
import json
import bcrypt
import datetime
import decimal
import jwt
import os
import requests

auth = Blueprint('auth', __name__)


@auth.route('/auth/login', methods=['POST'])
def login():
    req_data = request.get_json()
    username = req_data.get('username')
    password = req_data.get('password')

    if username is None or password is None:
        return jsonify(msg="Missing params"), 400

    user = Users.query.filter_by(username=username).first()

    if user is None:
        return jsonify(msg="User doesn't exist"), 404

    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        response = {
            "id": user.id,
            "username": user.username,
            "password": user.password,
        }

        token = jwt.encode(response, os.environ.get(
            'SECRET_KEY'), algorithm="HS256").decode('utf-8')

        return jsonify({
            **response,
            'msg': 'Logged',
            'token': token
        }), 200
    else:
        return jsonify(msg="Invalid password"), 401


@auth.route('/auth/signup', methods=['POST'])
def signup():
    req_data = request.get_json()
    username = req_data.get('username')
    password = req_data.get('password')

    if username is None or password is None:
        return jsonify(msg="Missing params"), 400

    user_exists = Users.query.filter_by(username=username).first()

    if user_exists is not None:
        return jsonify(msg="Username already taken."), 400

    hashed_password = bcrypt.hashpw(
        password.encode('utf8'),
        bcrypt.gensalt(5)
    ).decode('utf-8')

    new_user = Users(username, hashed_password)

    db.session.add(new_user)
    db.session.commit()

    response = {
        "id": new_user.id,
        "username": new_user.username,
        "createdAt": new_user.createdAt
    }
    token = jwt.encode(response, os.environ.get(
        'SECRET_KEY'), algorithm="HS256").decode('utf-8')

    return jsonify({**response, "token": token}), 200


@auth.route('/auth/reconnect', methods=['POST'])
@protected_route
def reconnect():
    username = g.user.get('username')
    id = g.user.get('id')

    data_to_encode = {
        "username": username,
        "id": id
    }

    new_token = jwt.encode(data_to_encode, os.environ.get(
        'SECRET_KEY'), algorithm="HS256").decode('utf-8')

    return jsonify({
        "username": username,
        "id": id,
        "token": new_token
    }), 200