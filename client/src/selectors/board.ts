import { ListInterface } from '../interfaces/List';
import { PriortyInterface } from '../interfaces/Priority';

export const getBoardTitle = (state): string => state.board.title;
export const getBoardLists = (state): ListInterface[] => state.board.lists;
export const getBoardId = (state): number => state.board.id;
export const selectPriorities = (state): PriortyInterface[] => state.board.priorities;