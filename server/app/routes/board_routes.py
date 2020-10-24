from flask import jsonify, Blueprint, request, g, Response
from sqlalchemy.orm import noload
from ..db import db
from ..models import Boards, Lists
from ..middlewares import protected_route
from uuid import uuid4
from operator import itemgetter

board = Blueprint('board', __name__)

# General boards creation and fetching endpoints


@board.route('/boards', methods=['GET'])
@protected_route
def get_boards():
    user_id = g.user.get('id')
    requested_boards = Boards.query.options(noload('lists')).filter_by(user_id=user_id)

    result = []

    for board in requested_boards:
        print(board.lists, flush=True)
        result.append({
            'id': board.id,
            'title': board.title
        })

    return jsonify(result), 200


@board.route('/boards', methods=['POST'])
@protected_route
def new_board():
    req_data = request.get_json()
    board_name = req_data.get('boardName')
    user_id = g.user.get('id')

    if board_name is None:
        return jsonify(msg='Missing param: boardName'), 400

    new_board = Boards(user_id, board_name)

    db.session.add(new_board)
    db.session.commit()

    if new_board is not None:
        return jsonify({
            'msg': 'New board created',
            'boardId': new_board.id,
            'boardName': new_board.title
        }), 200


@board.route('/boards/<board_id>', methods=['GET'])
@protected_route
def get_board(board_id):
    user_id = g.user.get('id')

    if board_id is None:
        return jsonify(msg="Missing param: board_id"), 400

    board = Boards.query.filter_by(id=board_id).first()

    if board.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403

    board_lists = []

    for list_ in board.lists:
        temp_list = {
            "id": list_.id,
            "title": list_.title,
            "createdat": list_.createdat,
            "tasks": list(map(lambda t: {
                'id': t.id,
                'title': t.title,
                'priority': t.priority.value if t.priority else None,
                'position': t.position,
            }, list_.tasks))
        }

        board_lists.append(temp_list)

    response = {
        'id': board.id,
        'title': board.title,
        'lists': board_lists
    }
    return jsonify(**response), 200


@board.route('/boards/<board_id>', methods=['DELETE'])
@protected_route
def delete_board(board_id):
    user_id = g.user.get('id')
    board = Boards.query.filter_by(id=board_id).first()

    if board is None:
        return jsonify(msg="Board not found"), 404

    if board.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403

    db.session.delete(board)
    db.session.commit()

    return jsonify(msg="Board,  all its lists and tasks were deleted"), 200


# Lists and Tasks related endpoints

@board.route('/boards/<board_id>/lists', methods=['GET'])
@protected_route
def get_board_lists(board_id):
    user_id = g.user.get('id')
    board = Boards.query.filter_by(id=board_id).first()

    if board.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403

    board_lists = []

    for list_ in board.lists:
        board_lists.append({
            "id": list_.id,
            "title": list_.title
        })

    return jsonify(result={
        "id": board.id,
        "title": board.title,
        "lists": board_lists
    }), 200


@board.route('/boards/<board_id>/lists', methods=['POST'])
@protected_route
def new_board_list(board_id):
    req_data = request.get_json()
    user_id = g.user.get('id')
    title = req_data.get('title')

    if title is None:
        return jsonify(msg="Missing param: title"), 401

    requested_board = Boards.query.filter_by(id=board_id).first()

    if requested_board.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403

    new_list = Lists(board_id, user_id, title)
    db.session.add(new_list)
    db.session.commit()

    if new_list is not None:
        return jsonify({
            "id": new_list.id,
            "title": new_list.title,
            "tasks": []
        }), 200
