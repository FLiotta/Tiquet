import axios, { AxiosPromise } from "axios";
import Cookies from 'universal-cookie';

class ApiService {
  api: string;
  cookies: Cookies;

  constructor() {
    this.api = 'http://localhost:5000/api';
    this.cookies = new Cookies();
  }

  get(path: string, params?: object): AxiosPromise {
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

  post(path: string, params?: object): AxiosPromise {
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

  put(path: string, params: object): AxiosPromise {
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

  patch(path: string, params: object): AxiosPromise {
    const token = this.cookies.get('token');
    const fullPath = [this.api, path].join('');

    const options = {
      headers: {}
    };

    if (token) {
      options['headers']['token'] = token;
    }

    return axios.patch(fullPath, params, options);
  }

  delete(path: string, params?: object): AxiosPromise {
    const token = this.cookies.get('token');
    const fullPath = [this.api, path].join('');

    const headers = {};

    if (token) {
      headers['token'] = token;
    }

    return axios.delete(fullPath, { headers, params });
  }
}

export default ApiService;