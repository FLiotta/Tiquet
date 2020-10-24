from flask import jsonify, g, request, Blueprint
from sqlalchemy.orm import noload
from ..middlewares import protected_route
from ..models import Tasks, Lists
from ..db import db
from uuid import uuid4
from operator import itemgetter

task = Blueprint('task', __name__)


@task.route('/tasks/<task_id>', methods=['GET'])
@protected_route
def get_Task(task_id):
    user_id = g.user.get('id')
    requested_task = Tasks.query.filter_by(id=task_id).first()

    if requested_task.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403

    response = {
        'uid': requested_task.uid,
        'id': requested_task.id,
        'title': requested_task.title,
        'createdAt': requested_task.createdAt,
        'description': requested_task.description,
        'list': requested_task.list_id,
    }

    if requested_task.priority is not None:
        response['priority'] = requested_task.priority.value

    return jsonify(response), 200


@task.route('/tasks/<task_id>', methods=['DELETE'])
@protected_route
def delete_task(task_id):
    user_id = g.user.get('id')
    requested_task = Tasks.query.filter_by(id=task_id).first()

    if requested_task.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403

    db.session.delete(requested_task)
    db.session.commit()

    return jsonify(msg="Task deleted"), 200


@task.route('/tasks/<task_id>/list', methods=['PATCH'])
@protected_route
def update_task_list(task_id):
    req_data = request.get_json()
    list_id = req_data.get('listId')
    new_position = req_data.get('position')
    user_id = g.user.get('id')

    if list_id is None or task_id is None or new_position is None:
        return jsonify(msg="Missing params"), 400

    list_id = int(list_id)
    new_position = int(new_position)
    task_id = int(task_id)

    results = db.session.query(Lists, Tasks)\
        .filter(Lists.id==list_id)\
        .join(Tasks, Tasks.id==task_id)\
        .first_or_404()

    if user_id != results[0].user_id:
        return jsonify(msg="You can't perform this action."), 403

    order = [x for x in results[0].tasks]
    order.insert(new_position, results[1])
    
    for i, task in enumerate(order):
        task.position = i

        if task.id == task_id:
            task.list_id = list_id

    db.session.commit()

    return jsonify(msg="Task updated"), 200

@task.route('/tasks/<task_id>/description', methods=['PATCH'])
@protected_route
def update_task_description(task_id):
    req_data = request.get_json()
    description = req_data.get('description')
    user_id = g.user.get('id')

    if description is None:
        return jsonify(msg="Missing param: description"), 400

    requested_task = Tasks.query.options(noload('priority')).filter_by(id=task_id).first()

    if user_id != requested_task.user_id:
        return jsonify(msg="You can't perform this action."), 403
    elif requested_task.description == description:
        return jsonify(msg="New description can't be the same as the old one."), 400

    requested_task.description = description
    db.session.commit()

    return jsonify(msg="Task updated"), 200


@task.route('/tasks/<task_id>/priority', methods=['PATCH'])
@protected_route
def update_task_priority(task_id):
    req_data = request.get_json()
    new_priority_id = req_data.get('priority')
    user_id = g.user.get('id')

    if new_priority_id is None:
        return jsonify(msg="Missing param: priority"), 400
    
    requested_task = Tasks.query.filter_by(id=task_id).first()

    if user_id != requested_task.user_id:
        return jsonify(msg="You can't perform this action."), 403
    elif requested_task.priority_id == new_priority_id:
        return jsonify(msg="New priority can't be the same as the old one."), 400

    requested_task.priority_id = new_priority_id
    db.session.commit()

    return jsonify(msg="Task updated"), 200


@task.route('/tasks/<task_id>/title', methods=['PATCH'])
@protected_route
def update_task_title(task_id):
    req_data = request.get_json()
    new_title = req_data.get('title')
    user_id = g.user.get('id')

    if new_title is None:
        return jsonify(msg="Missing param: title"), 400
    
    requested_task = Tasks.query.options(noload('priority')).filter_by(id=task_id).first()

    if user_id != requested_task.user_id:
        return jsonify(msg="You can't perform this action."), 403
    elif requested_task.title == new_title:
        return jsonify(msg="New title can't be the same as the old one."), 400

    requested_task.title = new_title
    db.session.commit()

    return jsonify(msg="Task updated"), 200
