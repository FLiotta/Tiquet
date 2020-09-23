import json

def test_login_success(client, existing_test_user):
    """Login successfully"""

    params = existing_test_user
    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/login', data=json.dumps(params), headers=headers)

    assert response.status_code == 200

def test_login_fail_invalid_password(client, existing_test_user):
    params = {
        'username': existing_test_user['username'],
        'password': 'invalidpassword123'
    }

    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/login', data=json.dumps(params), headers=headers)

    assert response.status_code == 401

def test_login_fail_user_not_exists(client):
    params = {
        'username': 'inexistent_user_in_db',
        'password': 'whatever',
    }

    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/login', data=json.dumps(params), headers=headers)

    assert response.status_code == 404

def test_login_fail_missing_params(client, existing_test_user):
    """Missing params: Username and Password"""

    params = {}

    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/login', data=json.dumps(params), headers=headers)

    assert response.status_code == 400

def test_login_fail_missing_params_username(client, existing_test_user):
    """Missing params: Username"""

    params = {
        'password': 'test_password'
    }

    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/login', data=json.dumps(params), headers=headers)

    assert response.status_code == 400

def test_login_fail_missing_params_password(client, existing_test_user):
    """Missing params: Password"""

    params = {
        'username': 'test_username'
    }

    headers = {
        'content-type': 'application/json'
    }

    response = client.post('/api/auth/login', data=json.dumps(params), headers=headers)

    assert response.status_code == 400