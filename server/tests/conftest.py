from app import create_app
from dotenv import load_dotenv
from os.path import join, dirname, abspath
import os
import jwt

load_dotenv(join(dirname(__file__), abspath('..'), '.env'))

import pytest

@pytest.fixture
def client():
    app = create_app(log=False)
    client = app.test_client()

    return client

@pytest.fixture
def existing_test_user():
    return {
        'id': 11,
        'username': 'test_user',
        'password': 'test_password'
    }

@pytest.fixture
def valid_token():
    data_to_encode = {
        'id': 11,
        'username': 'test_user',
        'password': 'test_password'
    }

    new_token = jwt.encode(data_to_encode, os.environ.get(
        'SECRET_KEY'), algorithm="HS256").decode('utf-8')

    return new_token

@pytest.fixture
def invalid_token():
    data_to_encode = {
        'id': 11,
        'username': 'test_user',
        'password': 'test_password'
    }

    new_token = jwt.encode(data_to_encode, 'INVALID KEY', algorithm="HS256").decode('utf-8')

    return new_token