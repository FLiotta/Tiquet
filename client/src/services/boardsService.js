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

  fetchBoardLists(boardId) {
    return this.get(`/boards/${boardId}/get-lists`);
  }
}

export default AuthService;