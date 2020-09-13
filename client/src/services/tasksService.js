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

  updateDescription(taskId, description) {
    return this.put(`/tasks/${taskId}/update-description`, { description });
  }

  updatePriority(taskId, priority) {
    return this.put(`/tasks/${taskId}/update-priority`, { priority });
  }
}

export default TasksService;