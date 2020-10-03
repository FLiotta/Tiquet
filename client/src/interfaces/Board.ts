import { IList } from './List';
import { IPriority } from './Priority';

export interface IBoard {
    id: number,
    title: string,
    lists?: IList[],
    priorities?: IPriority[]
};