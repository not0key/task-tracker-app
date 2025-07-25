import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ITask } from "./task.model";

interface TaskState {
  tasks: ITask[];
  addTask: (task: Omit<ITask, "id">) => void;
  updateTask: (task: ITask) => void;
  updateTaskStatus: (id: string, status: ITask["status"]) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (task) => {
        const newTask: ITask = {
          ...task,
          id: crypto.randomUUID(),
          startDate: task.startDate || new Date().toISOString(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      updateTask: (updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        }));
      },

      updateTaskStatus: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        }));
      },

      removeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
    }),
    {
      name: "user-tasks",
    }
  )
);
