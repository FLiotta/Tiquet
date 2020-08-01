from flask import jsonify, Blueprint, request, g
from database.db import Database
from middlewares.protected_route import protected_route
import json
import bcrypt
import datetime
import decimal
import jwt
import os

auth = Blueprint('auth', __name__)


@auth.route('/auth/login', methods=['POST'])
def login():
    req_data = request.get_json()
    username = req_data.get('username')
    password = req_data.get('password')

    if username and password:
        db = Database()
        db.query(
            "SELECT id, username, password FROM users WHERE username='{0}'".format(username))

        user = db.cur.fetchone()

        if user is not None:
            user_id = user[0]
            user_username = user[1]
            user_password_hashed = user[2]

            if bcrypt.checkpw(password.encode('utf-8'), user_password_hashed.encode('utf-8')):
                response = {
                    "id": user_id,
                    "username": user_username,
                    "password": user_password_hashed,
                }
                token = jwt.encode(response, os.environ.get('SECRET_KEY'),
                                    algorithm="HS256").decode('utf-8')
                return jsonify({
                    **response,
                    'msg': 'Logged',
                    'token': token
                }), 200
        return jsonify(msg="User doesn't exist"), 404


@auth.route('/auth/signup', methods=['POST'])
def signup():
    req_data = request.get_json()
    username = req_data.get('username')
    password = req_data.get('password')

    if username and password:
        db = Database()
        db.query("SELECT * FROM users WHERE username='{0}'".format(username))
        result = db.cur.fetchall()

        if len(result) > 0:
            db.close()
            return jsonify(msg="Username already taken."), 400

        hashed_password = bcrypt.hashpw(
            password.encode('utf8'),
            bcrypt.gensalt(5)
        ).decode('utf-8')

        db = Database()
        db.query("INSERT INTO users(username, password, createdat) VALUES ('{0}','{1}',{2}) RETURNING id, username, password, createdat".format(
            username, hashed_password, int(datetime.datetime.now().timestamp())))
        db.commit()
        new_user = db.cur.fetchall()[0]
        db.close()

        response = {
            "id": new_user[0],
            "username": new_user[1],
            "password": new_user[2],
            "createdAt": new_user[3]
        }

        token = jwt.encode(response, os.environ.get('SECRET_KEY'),
                            algorithm="HS256").decode('utf-8')
        
        return jsonify({ **response, "token": token }), 200
    return jsonify(msg="Missing params"), 400

@auth.route('/auth/reconnect', methods=['POST'])
@protected_route
def reconnect():
    new_token = jwt.encode({
        "username": g.user.get('username'),
        "id": g.user.get('id')
    }, os.environ.get('SECRET_KEY'), algorithm="HS256").decode('utf-8')

    return jsonify({
        "username": g.user.get('username'),
        "id": g.user.get('id'),
        "token": new_token
    }), 200