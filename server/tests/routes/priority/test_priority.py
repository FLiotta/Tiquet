import json

def test_priorities_success(client, valid_token):
    headers = {
        'content-type': 'application/json',
        'token': valid_token
    }

    response = client.get('/api/priorities', headers=headers)

    response.status_code == 200

def test_priorities_fail_no_token(client):
    headers = {
        'content-type': 'application/json'
    }

    response = client.get('/api/priorities', headers=headers)

    response.status_code == 401

def test_priorities_fail_invalid_token(client, invalid_token):
    headers = {
        'content-type': 'application/json',
        'token': invalid_token
    }

    response = client.get('/api/priorities', headers=headers)

    response.status_code == 400