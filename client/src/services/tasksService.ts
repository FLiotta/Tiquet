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

  updateList(taskId: number, listId: number, position: number) {
    return this.patch(`/tasks/${taskId}/list`, { listId, position });
  }

  updateDescription(taskId: number, description: string) {
    return this.patch(`/tasks/${taskId}/description`, { description });
  }

  updateTitle(taskId: number, title: string) {
    return this.patch(`/tasks/${taskId}/title`, { title });
  }

  updatePriority(taskId: number, priorityId: number) {
    return this.patch(`/tasks/${taskId}/priority`, { priority: priorityId });
  }
}

export default TasksService;