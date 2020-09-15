import { AxiosPromise } from 'axios';
import ApiService from './apiService';

class AuthService extends ApiService {
  constructor() {
    super();
  }

  login(username: string, password: string): AxiosPromise {
    return this.post('/auth/login', { username, password });
  }

  signup(username: string, password: string): AxiosPromise {
    return this.post('/auth/signup', { username, password });
  }

  reconnect(): AxiosPromise {
    return this.post('/auth/reconnect');
  }
}

export default AuthService;