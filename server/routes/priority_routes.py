from flask import g, jsonify, Blueprint
from database.db import db
from middlewares.protected_route import protected_route
from models import Priorities

priority = Blueprint('priority', __name__)

@priority.route('/priorities', methods=['GET'])
@protected_route
def priority_root():
    priorities = Priorities.query.all()

    response = {
        'result': list(map(lambda p: { 'id': p.id, 'value': p.value }, priorities))
    }    
    return jsonify(response), 200