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

  updateTaskList(taskId, listId) {
    return this.put(`/boards/update-task-list`, { taskId, listId });
  }
}

export default AuthService;