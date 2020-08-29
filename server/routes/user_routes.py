from models import Users
from flask import jsonify, g, Blueprint, request
from database.db import db
from middlewares.protected_route import protected_route

user = Blueprint('user', __name__)

@user.route('/user/profile', methods=['GET'])
@protected_route
def profile():
    user_id = g.user.get('id')

    user = Users.query.filter_by(id=user_id).first()
    
    if user is not None:
        return jsonify({
            "result": {
                "id": user.id,
                "username": user.username,
                "createdAt": user.createdat,
            }
        }), 200
    return jsonify(msg="User doesn't exists"), 404