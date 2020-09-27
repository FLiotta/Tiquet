from app import create_app
from app.db import db

app = create_app(log=False)

with app.app_context():
    db.create_all()