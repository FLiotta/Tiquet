import { IRootReducer } from '../reducers/rootReducer';

export const isLoggedSelector = (state: IRootReducer): Boolean => !!state.session.token;