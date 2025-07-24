export type TTaskStatus = "todo" | "in_progress" | "ready";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: TTaskStatus;
}
