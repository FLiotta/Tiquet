from database.db import db
import datetime

class Users(db.Model):
    __tablename__ = "users"
    id = db.Column('id', db.Integer, primary_key=True)
    username = db.Column('username', db.Text, not_null=True, unique=True)
    password = db.Column('password', db.Text, not_null=True)
    createdAt = db.Column('createdat', db.Integer)

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.createdAt = int(datetime.datetime.now().timestamp())

class Boards(db.Model):
    __tablename__ = "boards"
    id = db.Column('id', db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
    title = db.Column('title', db.Text)
    lists = db.relationship('Lists', backref="board", lazy="joined")

    def __init__(self, user_id, title):
        self.user_id = user_id
        self.title = title

class Lists(db.Model):
    __tablename__ = "lists"
    id = db.Column('id', db.Integer, primary_key=True)
    board_id = db.Column('board_id', db.Integer, db.ForeignKey('boards.id'))
    title = db.Column('title', db.Text)
    tasks = db.relationship('Tasks', backref="list", lazy="joined")

    def __init__(self, board_id, title):
        self.board_id = board_id
        self.title = title

class Tasks(db.Model):
    __tablename__ = "tasks"
    id = db.Column('id', db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
    list_id = db.Column('list_id', db.Integer, db.ForeignKey('lists.id'))
    title = db.Column('title', db.Text)
    uid = db.Column('uid', db.Text)

    def __init__(self, user_id, list_id, title, uid):
        self.user_id = user_id
        self.list_id = list_id
        self.title = title
        self.uid = uid