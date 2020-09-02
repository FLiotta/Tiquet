from flask import jsonify, g, request, Blueprint
from middlewares.protected_route import protected_route
from models import Tasks
from uuid import uuid4
from database.db import db

task = Blueprint('task', __name__)


@task.route('/tasks/<task_id>', methods=['GET', 'DELETE'])
@protected_route
def task_root(task_id):
    method = request.method

    if method == 'GET':
        requested_task = Tasks.query.filter_by(id=task_id).first()
        
        response = {
            'uid': requested_task.uid,
            'id': requested_task.id,
            'title': requested_task.title,
        }
        return jsonify(response), 200
    elif method == 'DELETE':
        requested_task = Tasks.query.filter_by(id=task_id).first()
        db.session.delete(requested_task)
        db.session.commit()

        return jsonify(msg="Task deleted"), 200