import { AxiosPromise } from 'axios';
import ApiService from './apiService';

class OAuthService extends ApiService {
  constructor() {
    super();
  }

  github(code: string, state: string): AxiosPromise {
    return this.post('/oauth/github', { code, state });
  }
}

export default OAuthService;