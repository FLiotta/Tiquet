import { AxiosPromise } from 'axios';
import ApiService from './apiService';

class PrioritiesService extends ApiService {
  constructor() {
    super();
  }

  fetchPriorities(): AxiosPromise {
    return this.get('/priorities');
  }
}

export default PrioritiesService;