import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ITask } from "./types";

interface TaskState {
  tasks: ITask[];
  addTask: (task: Omit<ITask, "id">) => void;
  updateTask: (task: ITask) => void;
  updateTaskStatus: (id: string, status: ITask["status"]) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) => {
        const newTask: ITask = {
          ...task,
          id: crypto.randomUUID(),
          startDate: task.startDate || new Date().toISOString(),
        };
        set({ tasks: [...get().tasks, newTask] });
      },
      updateTask: (updated) => {
        set({
          tasks: get().tasks.map((t) => (t.id === updated.id ? updated : t)),
        });
      },
      updateTaskStatus: (id, status) => {
        set({
          tasks: get().tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        });
      },
      removeTask: (id) => {
        set({ tasks: get().tasks.filter((t) => t.id !== id) });
      },
    }),
    { name: "task-storage" }
  )
);
