from flask import jsonify, Blueprint, request, g, Response
from database.db import Database
from middlewares.protected_route import protected_route
from uuid import uuid4
board = Blueprint('board', __name__)

# General boards creation and fetching endpoints

@board.route('/boards', methods=['GET'])
@protected_route
def boardsList():
    db = Database()
    db.query('SELECT id, title FROM boards WHERE user_id={0}'.format(g.user['id']))
    rows = db.cur.fetchall()
    db.close()

    result = []
    for row in rows:
        result.append({
            'id': row[0],
            'title': row[1]
        })

    return jsonify(result)

@board.route('/boards/<board_id>', methods=['GET', 'DELETE'])
@protected_route
def board_root(board_id):
    if board_id is not None:
        db = Database()
        if request.method == 'GET':
            db.query("""
                SELECT
                    board.id,
                    board.title,
                    board.user_id,
                    COALESCE(
                        json_agg(
                            json_build_object(
                                'id', lists.id,
                                'uid', lists.uid,
                                'title', lists.title,
                                'tasks', lists.tasks
                            )
                        )
                        FILTER (WHERE lists IS NOT NULL), '[]'
                    ) lists
                FROM boards board
                LEFT JOIN (
                    SELECT 
                        lists.id,
                        lists.uid,
                        lists.title,
                        lists.board_id,
                        COALESCE(
                            json_agg(
                                json_build_object(
                                    'id', tasks.id,
                                    'uid', tasks.uid,
                                    'title', tasks.title
                                )
                            ) 
                            FILTER (WHERE tasks IS NOT NULL), '[]'
                        ) tasks
                    FROM lists
                    LEFT JOIN (
                        SELECT
                            tasks.id,
                            tasks.uid,
                            tasks.title,
                            tasks.list_id
                        FROM tasks
                    ) tasks ON tasks.list_id=lists.id
                    GROUP BY lists.id
                ) lists ON lists.board_id={0}
                WHERE board.id={0}
                GROUP BY board.id
            """.format(board_id))

            rows = db.cur.fetchone()
            db.close()

            if rows is None:
                return jsonify(msg="Board doesn't exists"), 404
            elif rows[2] is not g.user['id']:
                return jsonify(msg="You don't have access to this board"), 403

            response = {
                'id': rows[0],
                'title': rows[1],
                'lists': rows[3]
            }
            return jsonify(**response), 200
        elif request.method == 'DELETE':
            db.query("DELETE FROM boards WHERE id={0} AND user_id={1}".format(board_id, g.user['id']))
            db.commit()
            db.close()

            if db.cur.rowcount == 0:
                return jsonify(msg="Error deleting the board"), 403
            return jsonify(msg="Board deleted"), 200

@board.route('/boards/new', methods=['POST'])
@protected_route
def boards_new():
    req_data = request.get_json()
    board_name = req_data.get('boardName')

    if board_name is not None:
        
        db = Database()
        db.query("INSERT INTO boards(user_id, title) VALUES ('{0}','{1}') RETURNING id, title".format(g.user.get('id'), board_name))
        db.commit()
        new_board = db.cur.fetchone()
        db.close()
        if new_board is not None:
            return jsonify({
                'msg': 'New board created',
                'boardId': new_board[0],
                'boardName': new_board[1]
            }), 200

    return jsonify(msg='You must provide a board name'), 400

# Lists and Tasks related endpoints

@board.route('/boards/<board_id>/get-lists', methods=['GET'])
@protected_route
def boards_get_lists(board_id):
    db = Database()

    db.query("""
        SELECT 
            lists.id, 
            lists.title, 
            COALESCE(
                json_agg(
                    json_build_object(
                        'id', tasks.id, 
                        'title', tasks.title
                    )
                ) 
                FILTER (WHERE tasks IS NOT NULL), '[]'
            ) AS tasks 
        FROM lists
        LEFT JOIN tasks ON tasks.list_id=lists.id
        WHERE lists.board_id={0}
        GROUP BY lists.id, lists.title
    """.format(board_id))

    rows = db.cur.fetchall()
    db.close()

    response = []

    for row in rows:
        response.append({
            'id': row[0],
            'title': row[1],
            'tasks': row[2]
        })
    
    return jsonify(result=response), 200

@board.route('/boards/<board_id>/get-tasks', methods=['GET'])
@protected_route
def boards_get_tasks(board_id):
    db = Database()

    db.query("SELECT * FROM tasks LEFT JOIN users ON tasks.user_id = users.id WHERE board_id={0}".format(board_id))
    rows = db.cur.fetchall()
    db.close()
    response = []
    for row in rows:
        response.append({
            'id': row[0],
            'board': row[2],
            'title': row[3],
            'creator': {
                'id': row[4],
                'username': row[5]
            }
        })
    return jsonify(response), 200

@board.route('/boards/<board_id>/new-task', methods=['POST'])
@protected_route
def boards_new_task(board_id):
    req_data = request.get_json()
    list_id = req_data.get('listId')
    task_title = req_data.get('title')

    if task_title is not None and list_id is not None:
        db = Database()
        db.query("""
            INSERT INTO tasks(
                user_id, 
                board_id, 
                list_id, 
                title,
                uid)
            VALUES ({0}, {1}, {2}, '{3}', '{4}') 
            RETURNING id, uid, title
        """.format(g.user['id'], board_id, list_id, task_title, uuid4()))
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

@board.route('/boards/<board_id>/new-list', methods=['POST'])
@protected_route
def boards_new_list(board_id):
    req_data = request.get_json()
    title = req_data.get('title')

    if title is not None:
        db = Database()

        db.query("""
            INSERT INTO lists (board_id, title, uid) 
                SELECT {0}, '{1}', '{2}'
                WHERE EXISTS (
                    SELECT * 
                    FROM boards 
                    WHERE boards.id = {0})
            RETURNING id, uid, title
        """.format(board_id, title, uuid4()))

        result = db.cur.fetchone()
        db.commit()
        db.close()

        if result is not None:
            return jsonify({
                "id": result[0],
                "uid": result[1],
                "title": result[2]
            }), 200
        return jsonify(msg="No results"), 500
    else:
        return jsonify(msg="Missing param: title"), 401

@board.route('/boards/<board_id>/update-task-list', methods=['PUT'])
@protected_route
def update_task_list(board_id):
    req_data = request.get_json()
    task_id = req_data.get('taskId')
    list_id = req_data.get('listId')

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