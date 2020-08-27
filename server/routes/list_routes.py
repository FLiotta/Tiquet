from flask import jsonify, g, request, Blueprint
from database.db import Database
from middlewares.protected_route import protected_route
from uuid import uuid4

list_ = Blueprint('list', __name__)

@list_.route('/lists/<list_id>', methods=['GET'])
@protected_route
def list_root(list_id):
    db = Database()

    db.query("""
        SELECT 
            tasks.id, 
            tasks.title, 
            tasks.board_id, 
            json_build_object(
                'id', users.id,
                'username', users.username
            ) creator
            FROM tasks 
        LEFT JOIN users 
            ON tasks.user_id = users.id 
        WHERE list_id={0}
    """.format(list_id))
    rows = db.cur.fetchall()
    db.close()
    response = []
    for row in rows:
        response.append({
            'id': row[0],
            'title': row[1],
            'board': row[2],
            'creator': row[3]
        })
    return jsonify(response), 200

@list_.route('/lists/<list_id>/new-task', methods=['POST'])
@protected_route
def new_task(list_id):
    req_data = request.get_json()
    task_title = req_data.get('title')

    if task_title is not None and list_id is not None:
        db = Database()
        db.query("""
            INSERT INTO tasks(
                user_id, 
                list_id, 
                title,
                uid)
            VALUES ({0}, {1}, '{2}', '{3}') 
            RETURNING id, uid, title
        """.format(g.user['id'], list_id, task_title, uuid4()))
        db.commit()

        new_task = db.cur.fetchone()
        db.close()

        return jsonify({
            "result": {
                'id': new_task[0],
                'uid': new_task[1],
                'title': new_task[2]
            }
        }), 200

    return jsonify(msg="Missing params"), 400

@list_.route('/lists/<list_id>/update-task', methods=['PUT'])
@protected_route
def update_task(list_id):
    req_data = request.get_json()
    task_id = req_data.get('taskId')

    if list_id is not None and task_id is not None:
        db = Database()

        db.query("""
            UPDATE tasks
                SET list_id={0}
                WHERE id={1}
        """.format(list_id, task_id))

        result = "db.cur.fetchone()"
        db.commit()
        db.close()

        return jsonify(result), 200
    return jsonify(msg="Missing params"), 400