from flask import jsonify, g, request, Blueprint
from ..db import db
from ..middlewares import protected_route
from ..models import Lists, Tasks
from uuid import uuid4

list_ = Blueprint('list', __name__)


@list_.route('/lists/<list_id>', methods=['GET'])
@protected_route
def get_list(list_id):
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


@list_.route('/lists/<list_id>', methods=['DELETE'])
@protected_route
def delete_list(list_id):
    user_id = g.user.get('id')
    result = db.session.query(Lists).filter_by(id=list_id).first()

    if result is not None:
        if result.user_id != user_id:
            return jsonify(msg="You can't perform this action."), 403

        db.session.delete(result)
        db.session.commit()

        return jsonify(msg="List and all its tasks deleted."), 200
    return jsonify(msg="List not found"), 404


@list_.route('/lists/<list_id>/title', methods=['PATCH'])
@protected_route
def edit_list_title(list_id):
    req_data = request.get_json()
    user_id = g.user.get('id')
    title = req_data.get('title')

    requested_list = Lists.query.filter_by(id=list_id).first()

    if requested_list is None:
        return jsonify(msg="List not found"), 404
    if requested_list.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403
    if requested_list.title == title:
        return jsonify("New title can't be equal to the actual one"), 400

    requested_list.title = title

    db.session.commit()

    return jsonify(msg="Title updated"), 200


@list_.route('/lists/<list_id>/task', methods=['POST'])
@protected_route
def new_list_task(list_id):
    req_data = request.get_json()
    user_id = g.user.get('id')
    task_title = req_data.get('title')

    if task_title is None or list_id is None:
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
            'title': new_task.title,
            'priority': new_task.priority.value,
        }
    }), 200


@list_.route('/lists/<list_id>/sort', methods=['POST'])
@protected_route
def sort_list_tasks(list_id):
    req_data = request.get_json()
    user_id = g.user.get('id')
    order = req_data.get('order')

    if order is None:
        return jsonify(msg="Missing params"), 400

    requested_tasks = Tasks.query.filter_by(
        list_id=list_id, user_id=user_id).all()
    
    for task in requested_tasks:
        task.position = order.index(task.id)

    db.session.commit()

    return jsonify(msg="Tasks sorted"), 200
