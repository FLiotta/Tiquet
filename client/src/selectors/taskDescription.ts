import { IRootReducer } from '../reducers/rootReducer';
import { TaskInterface } from "../interfaces/Task";

export const selectTaskInfoVisible = (state: IRootReducer): Boolean => state.taskDescription.visible;
export const selectTaskInfoLoading = (state: IRootReducer): Boolean => state.taskDescription.loading;
export const selectTaskInfo = (state: IRootReducer): TaskInterface => state.taskDescription.taskInfo;
export const selectTaskInfoId = (state: IRootReducer): number => state.taskDescription.taskInfo.id;