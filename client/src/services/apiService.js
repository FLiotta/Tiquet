import axios from "axios";

class ApiService {
  constructor() {
    this.api = 'http://localhost:5000/api';
  }

  get(path, params) {
    let fullPath = [path];

    if (params) {
      params = this.paramsBuilder(params);

      fullPath.push(params);
      fullPath = fullPath.join('/');
    }

    return fetch(`${this.api}${fullPath}`).then((res) => res.json());
  }

  paramsBuilder(params) {
    const tempParams = [];

    params.forEach(param => {
      if (param) {
        tempParams.push(param);
      }
    });

    return tempParams.join('/');
  }
}

export default ApiService;