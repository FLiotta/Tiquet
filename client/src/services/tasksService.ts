import ApiService from './apiService';

class TasksService extends ApiService {
  constructor() {
    super();
  }

  fetchTask(taskId: number) {
    return this.get(`/tasks/${taskId}`);
  }

  deleteTask(taskId: number) {
    return this.delete(`/tasks/${taskId}`);
  }

  updateList(taskId: number, listId: number) {
    return this.patch(`/tasks/${taskId}/list`, { listId });
  }

  updateDescription(taskId: number, description: string) {
    return this.patch(`/tasks/${taskId}/description`, { description });
  }

  updatePriority(taskId: number, priorityId: number) {
    return this.patch(`/tasks/${taskId}/priority`, { priority: priorityId });
  }
}

export default TasksService;