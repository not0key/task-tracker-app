import type { ITask } from "../model/types";

interface FilterOptions {
  search?: string;
  startDate?: string;
  endDate?: string;
}

export const filterTasks = (
  tasks: ITask[],
  { search = "", startDate = "", endDate = "" }: FilterOptions
) => {
  return tasks.filter((t) => {
    const titleMatch = t.title.toLowerCase().includes(search.toLowerCase());
    const taskStart = new Date(t.startDate);
    const afterStart =
      !startDate || taskStart >= new Date(startDate + "T00:00:00");
    const beforeEnd = !endDate || taskStart <= new Date(endDate + "T23:59:59");

    return titleMatch && afterStart && beforeEnd;
  });
};
