import { IRootReducer } from '../reducers/rootReducer';
import { IBoard } from '../interfaces/Board';

export const selectBoards = (state: IRootReducer): IBoard[] => state.boards.result;