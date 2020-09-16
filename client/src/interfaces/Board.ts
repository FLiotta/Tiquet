import { ListInterface } from './List';
import { PriortyInterface } from './Priority';

export interface BoardInterface {
    id: number,
    title: string,
    lists?: ListInterface[],
    priorities?: PriortyInterface[]
};