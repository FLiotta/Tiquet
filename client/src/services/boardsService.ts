import { AxiosPromise } from 'axios';
import ApiService from './apiService';

class BoardsService extends ApiService {
  constructor() {
    super();
  }

  fetchBoards(): AxiosPromise {
    return this.get('/boards');
  }

  createBoard(boardName: string): AxiosPromise {
    return this.post('/boards', { boardName });
  }

  fetchBoard(boardId: number): AxiosPromise {
    return this.get(`/boards/${boardId}`);
  }

  deleteBoard(boardId: number): AxiosPromise {
    return this.delete(`/boards/${boardId}`);
  }

  createList(boardId: number, listTitle: string): AxiosPromise {
    return this.post(`/boards/${boardId}/lists`, { title: listTitle });
  }
}

export default BoardsService;