import { ITask } from './Task';

export interface IList {
  id: number,
  title: string,
  tasks: ITask[],
};