import ApiService from './apiService';

class TasksService extends ApiService {
  constructor() {
    super();
  }

  fetchTask(taskId) {
    return this.get(`/tasks/${taskId}`);
  }

  deleteTask(taskId) {
    return this.delete(`/tasks/${taskId}`);
  }

  updateList(taskId, listId) {
    return this.put(`/tasks/${taskId}/update-list`, { listId });
  }
}

export default TasksService;