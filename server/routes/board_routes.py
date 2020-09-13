from flask import jsonify, Blueprint, request, g, Response
from database.db import db
from models import Boards, Lists
from middlewares.protected_route import protected_route
from uuid import uuid4
board = Blueprint('board', __name__)

# General boards creation and fetching endpoints


@board.route('/boards', methods=['GET'])
@protected_route
def boardsList():
    user_id = g.user.get('id')
    requested_boards = Boards.query.filter_by(user_id=user_id)

    result = []

    for board in requested_boards:
        result.append({
            'id': board.id,
            'title': board.title
        })

    return jsonify(result), 200


@board.route('/boards/<board_id>', methods=['GET'])
@protected_route
def board_root(board_id):
    user_id = g.user.get('id')

    if board_id == None:
        return jsonify(msg="Missing param: board_id"), 400

    if request.method == 'GET':

        board = Boards.query.filter_by(id=board_id).first()

        if board.user_id != user_id:
            return jsonify(msg="You can't perform this action."), 403

        board_lists = []

        for list_ in board.lists:
            board_lists.append({
                "id": list_.id,
                "title": list_.title,
                "tasks": list(map(lambda t: {
                    'id': t.id,
                    'title': t.title,
                    'priority': t.priority.value if t.priority else None
                }, list_.tasks))
            })

        response = {
            'id': board.id,
            'title': board.title,
            'lists': board_lists
        }
        return jsonify(**response), 200


@board.route('/boards/new', methods=['POST'])
@protected_route
def boards_new():
    req_data = request.get_json()
    board_name = req_data.get('boardName')
    user_id = g.user.get('id')

    if board_name == None:
        return jsonify(msg='Missing param: boardName'), 400

    new_board = Boards(user_id, board_name)

    db.session.add(new_board)
    db.session.commit()

    if new_board != None:
        return jsonify({
            'msg': 'New board created',
            'boardId': new_board.id,
            'boardName': new_board.title
        }), 200


# Lists and Tasks related endpoints

@board.route('/boards/<board_id>/get-lists', methods=['GET'])
@protected_route
def boards_get_lists(board_id):
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


@board.route('/boards/<board_id>/new-list', methods=['POST'])
@protected_route
def boards_new_list(board_id):
    req_data = request.get_json()
    user_id = g.user.get('id')
    title = req_data.get('title')

    if title == None:
        return jsonify(msg="Missing param: title"), 401

    requested_board = Boards.query.filter_by(id=board_id).first()

    if requested_board.user_id != user_id:
        return jsonify(msg="You can't perform this action."), 403

    new_list = Lists(board_id, user_id, title)
    db.session.add(new_list)
    db.session.commit()

    if new_list != None:
        return jsonify({
            "id": new_list.id,
            "title": new_list.title,
            "tasks": []
        }), 200
