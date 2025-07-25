import type { ITask } from "../model/task.model";

type TChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

const statusColorMap: Record<ITask["status"], TChipColor> = {
  todo: "default",
  in_progress: "warning",
  ready: "success",
};

const statusLabelMap: Record<ITask["status"], string> = {
  todo: "К выполнению",
  in_progress: "В процессе",
  ready: "Готово",
};

export const getStatusColor = (status: ITask["status"]): TChipColor =>
  statusColorMap[status] ?? "default";

export const getStatusLabel = (status: ITask["status"]): string =>
  statusLabelMap[status] ?? "Неизвестно";
