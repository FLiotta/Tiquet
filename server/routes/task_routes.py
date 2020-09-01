from flask import jsonify, g, request, Blueprint
from middlewares.protected_route import protected_route
from models import Tasks
from uuid import uuid4

task = Blueprint('task', __name__)


@task.route('/tasks/<task_id>', methods=['GET'])
@protected_route
def task_root(task_id):
    requested_task = Tasks.query.filter_by(id=task_id).first()
    
    response = {
        'uid': requested_task.uid,
        'id': requested_task.id,
        'title': requested_task.title,
    }
    return jsonify(response), 200