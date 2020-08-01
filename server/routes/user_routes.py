from flask import jsonify, g, Blueprint, request
from database.db import Database
from middlewares.protected_route import protected_route

user = Blueprint('user', __name__)

@user.route('/user/profile', methods=['GET'])
@protected_route
def profile():
    db = Database()
    
    db.query("""
        SELECT 
            id, 
            username,
            createdat, 
            (SELECT count(*) FROM boards WHERE user_id={0}) AS boards
        FROM users
        WHERE id={0}
    """.format(g.user.get('id')))

    result = db.cur.fetchone()

    if result is not None:
        return jsonify({
            "result": {
                "id": result[0],
                "username": result[1],
                "createdAt": result[2],
                "boards": result[3],
            }
        }), 200
    return jsonify(msg="User doesn't exists"), 404