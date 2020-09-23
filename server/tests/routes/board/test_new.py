import json

def test_new_success(client, valid_token):
    params = {
        'boardName': 'My new board'
    }

    headers = {
        'content-type': 'application/json',
        'token': valid_token
    }

    response = client.post('/api/boards/new', headers=headers)

    response.status_code == 200

def test_new_fail_missing_param(client, valid_token):
    params = {}

    headers = {
        'content-type': 'application/json',
        'token': valid_token
    }

    response = client.post('/api/boards/new', headers=headers)

    response.status_code == 400

def test_new_fail_no_token(client):
    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/boards/new', headers=headers)

    response.status_code == 401

def test_new_fail_invalid_token(client, invalid_token):
    headers = {
        'content-type': 'application/json',
        'token': invalid_token
    }

    response = client.post('/api/boards/new', headers=headers)

    response.status_code == 400