import { TaskInterface } from "../interfaces/Task";

export const selectTaskInfoVisible = (state): Boolean => state.taskDescription.visible;
export const selectTaskInfoLoading = (state): Boolean => state.taskDescription.loading;
export const selectTaskInfo = (state): TaskInterface => state.taskDescription.taskInfo;
export const selectTaskInfoId = (state): number => state.taskDescription.taskInfo.id;