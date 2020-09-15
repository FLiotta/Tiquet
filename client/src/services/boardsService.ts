import { AxiosPromise } from 'axios';
import ApiService from './apiService';

class BoardsService extends ApiService {
  constructor() {
    super();
  }

  fetchBoards(): AxiosPromise {
    return this.get('/boards');
  }

  fetchBoard(boardId: number): AxiosPromise {
    return this.get(`/boards/${boardId}`);
  }

  createBoard(boardName: string): AxiosPromise {
    return this.post('/boards/new', { boardName });
  }

  createList(boardId: number, listTitle: string): AxiosPromise {
    return this.post(`/boards/${boardId}/new-list`, { title: listTitle });
  }
}

export default BoardsService;