import { IRootReducer } from '../reducers/rootReducer';
import { BoardInterface } from '../interfaces/Board';

export const selectBoards = (state: IRootReducer): BoardInterface[] => state.boards.result;