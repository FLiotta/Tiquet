import ApiService from './apiService';

class AuthService extends ApiService {
  constructor() {
    super();
  }

  fetchBoards() {
    return this.get('/boards');
  }

  fetchBoard(boardId) {
    return this.get(`/boards/${boardId}`);
  }
}

export default AuthService;