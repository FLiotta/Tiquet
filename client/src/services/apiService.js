import axios from "axios";
import Cookies from 'universal-cookie';

class ApiService {
  constructor() {
    this.api = 'http://localhost:5000/api';
    this.cookies = new Cookies();
  }

  get(path, params) {
    const token = this.cookies.get('token');
    const fullPath = [this.api, path].join('');

    const data = {
      params,
      headers: {}
    };

    if (token) {
      data['headers']['token'] = token;
    }
    
    return axios.get(fullPath, data);
  }

  post(path, params) {
    const token = this.cookies.get('token');
    const fullPath = [this.api, path].join('');

    const options = {
      headers: {}
    };

    if (token) {
      options['headers']['token'] = token;
    }

    return axios.post(fullPath, params, options);
  }

  put(path, params) {
    const token = this.cookies.get('token');
    const fullPath = [this.api, path].join('');

    const options = {
      headers: {}
    };

    if (token) {
      options['headers']['token'] = token;
    }

    return axios.put(fullPath, params, options);
  }
}

export default ApiService;