import { IRootReducer } from '../reducers/rootReducer';

export const isLoggedSelector = (state: IRootReducer): Boolean => !!state.session.token;
export const isSessionFetching = (state: IRootReducer): Boolean => state.session.fetching;