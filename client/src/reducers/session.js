const defaultState = {
  token: '',
  user: {
    id: '',
    username: '',
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
