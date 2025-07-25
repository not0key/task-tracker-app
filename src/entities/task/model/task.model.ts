import type { TASK_STATUSES } from "../lib/task.constants";

export type TTaskStatus = (typeof TASK_STATUSES)[number];

export interface ITask {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: TTaskStatus;
}
