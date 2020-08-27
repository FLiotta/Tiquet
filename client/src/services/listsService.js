import ApiService from './apiService';

class ListService extends ApiService {
  constructor() {
    super();
  }

  updateTask(taskId, listId) {
    return this.put(`/lists/${listId}/update-task`, { taskId });
  }

  createTask(taskTitle, listId) {
    return this.post(`/lists/${listId}/new-task`, { title: taskTitle });
  }
}

export default ListService;