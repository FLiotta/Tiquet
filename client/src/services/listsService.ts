import { AxiosPromise } from 'axios';
import ApiService from './apiService';

class ListService extends ApiService {
  constructor() {
    super();
  }

  createTask(taskTitle: string, listId: number): AxiosPromise {
    return this.post(`/lists/${listId}/new-task`, { title: taskTitle });
  }
}

export default ListService;