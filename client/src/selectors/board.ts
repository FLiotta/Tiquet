import { IRootReducer } from '../reducers/rootReducer';
import { ListInterface } from '../interfaces/List';
import { PriortyInterface } from '../interfaces/Priority';

export const getBoardTitle = (state: IRootReducer): string => state.board.title;
export const getBoardLists = (state: IRootReducer): ListInterface[] => state.board.lists;
export const getBoardId = (state: IRootReducer): number => state.board.id;
export const selectPriorities = (state: IRootReducer): PriortyInterface[] => state.board.priorities;