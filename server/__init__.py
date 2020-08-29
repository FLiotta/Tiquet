from app import app
from models import Users
from dotenv import load_dotenv
from os.path import join, dirname

#Initialization
load_dotenv(join(dirname(__file__), '.env'))

if __name__ == "__main__":
    app.run(debug=True)