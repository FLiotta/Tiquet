import ApiService from './apiService';

class ListService extends ApiService {
  constructor() {
    super();
  }

  createTask(taskTitle, listId) {
    return this.post(`/lists/${listId}/new-task`, { title: taskTitle });
  }
}

export default ListService;