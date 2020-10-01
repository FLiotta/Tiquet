from flask import request, jsonify, Blueprint, g
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

oauth = Blueprint('oauth', __name__)

@oauth.route('/oauth/github', methods=['POST'])
def signup_github():
    req_data = request.get_json()
    user_code = req_data.get('code')
    user_state = req_data.get('state')

    params = {
        "client_id": os.environ.get("GITHUB_CLIENT_ID"),
        "client_secret": os.environ.get("GITHUB_CLIENT_SECRET"),
        "code": user_code,
        "state": user_state,
    }
    req = requests.post(url="https://github.com/login/oauth/access_token",params=params) 

    params = {}

    for param in str(req.content.decode('utf-8')).split("&"):
        key, value = param.split('=')
        params[key] = value

    headers = {
        "Authorization": "token " + params['access_token']
    }

    response_emails = requests.get('https://api.github.com/user/emails', headers=headers).json()
    primary_email = list(filter(lambda x: x['primary'],response_emails))[0]

    user = Users.query.filter_by(email=primary_email['email']).first()

    if user is None:
        response = requests.get('https://api.github.com/user', headers=headers).json()
        user = Users(username=response['login'], email=primary_email['email'], strategy="GITHUB")

    db.session.add(user)
    db.session.commit()

    response = {
        "id": user.id,
        "username": user.username,
        "strategy": user.strategy,
        "createdAt": user.createdAt
    }

    token = jwt.encode(response, os.environ.get(
        'SECRET_KEY'), algorithm="HS256").decode('utf-8')

    return jsonify({**response, "token": token}), 200