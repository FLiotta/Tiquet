import { TaskInterface } from './Task';

export interface ListInterface {
  id: number,
  title: string,
  tasks: TaskInterface[],
};