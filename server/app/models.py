from sqlalchemy import Column, Integer, ForeignKey, Text, Sequence, VARCHAR
from sqlalchemy.orm import relationship
from .db import db
import datetime

class Users(db.Model):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(VARCHAR(100), not_null=True, unique=True)
    password = Column(VARCHAR(100))
    email = Column(VARCHAR(100))
    strategy = Column(VARCHAR(100), not_null=True, default="AUTH")
    createdAt = Column('createdat', Integer)

    def __init__(self, username, strategy, **kwargs):
        self.username = username
        self.password = kwargs.get('password', None)
        self.email = kwargs.get('email', None)
        self.strategy = strategy
        self.createdAt = int(datetime.datetime.now().timestamp())

class Boards(db.Model):
    __tablename__ = "boards"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    title = Column(VARCHAR(100))
    lists = relationship('Lists', cascade="all, delete", backref="board", order_by="Lists.createdat", lazy="joined")

    def __init__(self, user_id, title):
        self.user_id = user_id
        self.title = title

class Lists(db.Model):
    __tablename__ = "lists"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    board_id = Column(Integer, ForeignKey('boards.id'))
    title = Column(VARCHAR(100))
    tasks = relationship('Tasks', cascade="all, delete", backref="list", order_by="Tasks.position", lazy="joined")
    createdat = Column(Integer, default=int(datetime.datetime.now().timestamp()))

    def __init__(self, board_id, user_id, title):
        self.board_id = board_id
        self.user_id = user_id
        self.title = title

class Tasks(db.Model):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    list_id = Column(Integer, ForeignKey('lists.id'))
    priority_id = Column(Integer, ForeignKey('priorities.id'))
    priority = relationship('Priorities', backref="task", lazy="joined")
    title = Column(VARCHAR(100))
    uid = Column(VARCHAR(100))
    createdAt = Column('createdat', Integer)
    description = Column(VARCHAR(250))
    position = Column(Integer, Sequence('tasks_position_seq'))

    def __init__(self, user_id, list_id, title, uid, description=''):
        self.user_id = user_id
        self.list_id = list_id
        self.title = title
        self.uid = uid
        self.description = description
        self.createdAt = int(datetime.datetime.now().timestamp())

class Priorities(db.Model):
    __tablename__ = "priorities"
    id = Column(Integer, primary_key=True)
    value = Column(VARCHAR)

    def __init__(self, value):
        self.value = value