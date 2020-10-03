import { IRootReducer } from '../reducers/rootReducer';
import { IList } from '../interfaces/List';
import { IPriority } from '../interfaces/Priority';

export const getBoardTitle = (state: IRootReducer): string => state.board.title;
export const getBoardLists = (state: IRootReducer): IList[] => state.board.lists;
export const getBoardId = (state: IRootReducer): number => state.board.id;
export const selectPriorities = (state: IRootReducer): IPriority[] => state.board.priorities;