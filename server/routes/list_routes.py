from flask import jsonify, g, request, Blueprint
from database.db import db
from middlewares.protected_route import protected_route
from models import Lists, Tasks
from uuid import uuid4

list_ = Blueprint('list', __name__)


@list_.route('/lists/<list_id>', methods=['GET'])
@protected_route
def list_root(list_id):
    list_ = Lists.query.filter_by(id=list_id).first()

    response = {
        'id': list_.id,
        'title': list_.title,
        'board': list_.board_id,
        'tasks': list(map(lambda t: {'id': t.id, 'title': t.title}, list_.tasks))
    }
    return jsonify(response), 200


@list_.route('/lists/<list_id>/new-task', methods=['POST'])
@protected_route
def new_task(list_id):
    req_data = request.get_json()
    user_id = g.user.get('id')
    task_title = req_data.get('title')

    if task_title is None or list_id is None:
        return jsonify(msg="Missing params"), 400

    new_task = Tasks(user_id, list_id, task_title, uuid4())

    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        "result": {
            'id': new_task.id,
            'uid': new_task.uid,
            'title': new_task.title
        }
    }), 200


@list_.route('/lists/<list_id>/update-task', methods=['PUT'])
@protected_route
def update_task(list_id):
    req_data = request.get_json()
    task_id = req_data.get('taskId')

    if list_id is None or task_id is None:
        return jsonify(msg="Missing params"), 400

    task = Tasks.query.filter_by(id=task_id).first()
    task.list_id = list_id
    
    db.session.commit()

    return jsonify(msg="Task updated"), 200