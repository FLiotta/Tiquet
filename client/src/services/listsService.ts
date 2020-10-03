import { AxiosPromise } from 'axios';
import ApiService from './apiService';

class ListService extends ApiService {
  constructor() {
    super();
  }

  deleteList(listId: number): AxiosPromise {
    return this.delete(`/lists/${listId}`);
  }

  createTask(taskTitle: string, listId: number): AxiosPromise {
    return this.post(`/lists/${listId}/task`, { title: taskTitle });
  }

  editTitle(listId: number, title: string): AxiosPromise {
    return this.patch(`/lists/${listId}/title`, { title });
  }
}

export default ListService;