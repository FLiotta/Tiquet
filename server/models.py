from sqlalchemy import Column, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship
from database.db import db
import datetime

class Users(db.Model):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(Text, not_null=True, unique=True)
    password = Column(Text, not_null=True)
    createdAt = Column('createdat', Integer)

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.createdAt = int(datetime.datetime.now().timestamp())

class Boards(db.Model):
    __tablename__ = "boards"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    title = Column(Text)
    lists = relationship('Lists', cascade="all, delete", backref="board", lazy="joined")

    def __init__(self, user_id, title):
        self.user_id = user_id
        self.title = title

class Lists(db.Model):
    __tablename__ = "lists"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    board_id = Column(Integer, ForeignKey('boards.id'))
    title = Column(Text)
    tasks = relationship('Tasks', cascade="all, delete", backref="list", lazy="joined")

    def __init__(self, board_id, user_id, title):
        self.board_id = board_id
        self.user_id = user_id
        self.title = title

class Tasks(db.Model):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    list_id = Column(Integer, ForeignKey('lists.id'))
    priority_id = Column(Integer, ForeignKey('priorities.id'), default=1)
    priority = relationship('Priorities', backref="task", lazy="joined")
    title = Column(Text)
    uid = Column(Text)
    createdAt = Column('createdat', Integer)
    description = Column(Text)

    def __init__(self, user_id, list_id, title, uid, description='', priority_id=1):
        self.user_id = user_id
        self.list_id = list_id
        self.title = title
        self.uid = uid
        self.description = description
        self.priority_id = priority_id
        self.createdAt = int(datetime.datetime.now().timestamp())

class Priorities(db.Model):
    __tablename__ = "priorities"
    id = Column(Integer, primary_key=True)
    value = Column(Text)

    def __init__(self, value):
        self.value = value