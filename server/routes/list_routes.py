from flask import jsonify, g, request, Blueprint
from database.db import db
from middlewares.protected_route import protected_route
from models import Lists, Tasks
from uuid import uuid4

list_ = Blueprint('list', __name__)


@list_.route('/lists/<list_id>', methods=['GET'])
@protected_route
def list_root(list_id):
    user_id = g.user.get('id')
    requested_list = Lists.query.filter_by(id=list_id).first()

    if requested_list.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403 

    response = {
        'id': requested_list.id,
        'title': requested_list.title,
        'board': requested_list.board_id,
        'tasks': list(map(lambda t: {'id': t.id, 'title': t.title}, requested_list.tasks))
    }
    return jsonify(response), 200


@list_.route('/lists/<list_id>/new-task', methods=['POST'])
@protected_route
def new_task(list_id):
    req_data = request.get_json()
    user_id = g.user.get('id')
    task_title = req_data.get('title')

    if task_title == None or list_id == None:
        return jsonify(msg="Missing params"), 400

    requested_list = Lists.query.filter_by(id=list_id).first()

    if requested_list.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403

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