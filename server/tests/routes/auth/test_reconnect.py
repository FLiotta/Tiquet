import json

def test_reconnect_success(client, valid_token):
    """Reconnect"""
    headers = {
        'content-type': 'application/json',
        'token': valid_token,
    }

    response = client.post('/api/auth/reconnect', headers=headers)

    assert response.status_code == 200

def test_reconnect_fail_no_token(client, invalid_token):
    headers = {
        'content-type': 'application/json'
    }

    response = client.get('/api/auth/reconnect', headers=headers)

    response.status_code == 401

def test_reconnect_fail_invalid_token(client, invalid_token):
    headers = {
        'content-type': 'application/json',
        'token': invalid_token
    }

    response = client.get('/api/auth/reconnect', headers=headers)

    response.status_code == 400