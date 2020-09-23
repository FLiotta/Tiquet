import json

def test_signup_failed_missing_params(client):
    """Missing params"""
    params = {}

    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/signup', data=json.dumps(params), headers=headers)

    assert response.status_code == 400

def test_signup_failed_missing_params_username(client):
    """Missing params: username"""
    params = {
        'password': 'test_password'
    }

    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/signup', data=json.dumps(params), headers=headers)

    assert response.status_code == 400

def test_signup_failed_missing_params_password(client):
    """Missing params: username"""
    params = {
        'username': 'test_username'
    }

    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/signup', data=json.dumps(params), headers=headers)

    assert response.status_code == 400