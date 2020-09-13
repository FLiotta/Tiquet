import ApiService from './apiService';

class PrioritiesService extends ApiService {
  constructor() {
    super();
  }

  fetchPriorities() {
    return this.get('/priorities');
  }
}

export default PrioritiesService;