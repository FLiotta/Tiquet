import ApiService from './apiService';

class ListService extends ApiService {
  constructor() {
    super();
  }

  updateTask(taskId, listId) {
    return this.put(`/lists/${listId}/update-task`, { taskId });
  }
}

export default ListService;