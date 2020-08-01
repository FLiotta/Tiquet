import ApiService from './apiService';

class AuthService extends ApiService {
  constructor() {
    super();
  }

  fetchBoards() {
    return this.get('/boards/list');
  }
}

export default AuthService;