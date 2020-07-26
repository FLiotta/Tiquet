import axios from "axios";

class ApiService {
  constructor() {
    this.api = 'http://localhost:5000/api';
  }

  get(path, params) {
    const fullPath = [this.api, path].join('/');

    return axios.get(fullPath, {
      params,
    });
  }

  post(path, params) {
    const fullPath = [this.api, path].join('/');

    return axios.post(fullPath, params);
  }
}

export default ApiService;