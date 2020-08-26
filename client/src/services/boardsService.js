import ApiService from './apiService';

class BoardsService extends ApiService {
  constructor() {
    super();
  }

  fetchBoards() {
    return this.get('/boards');
  }

  fetchBoard(boardId) {
    return this.get(`/boards/${boardId}`);
  }

  createBoard(boardName) {
    return this.post('/boards/new', { boardName });
  }

  createList(boardId, listTitle) {
    return this.post(`/boards/${boardId}/new-list`, { title: listTitle });
  }
}

export default BoardsService;