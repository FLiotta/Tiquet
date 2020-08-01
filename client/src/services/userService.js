import ApiService from './apiService';

class UserService extends ApiService {
  constructor() {
    super();
  }

  profile() {
    return this.get('/user/profile');
  }
}

export default UserService;