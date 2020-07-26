import axios from "axios";

class ApiService {
  get(path, params) {
    let fullPath = [path];

    if (params) {
      params = this.paramsBuilder(params);

      fullPath.push(params);
      fullPath = fullPath.join('/');
    }

    return fetch(fullPath).then((res) => res.json());
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