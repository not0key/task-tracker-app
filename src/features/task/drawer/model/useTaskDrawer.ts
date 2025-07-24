import { useState } from "react";
import type { ITask } from "@entities/task";

export const useTaskDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ITask | null>(null);

  const openForNew = () => {
    setSelected(null);
    setIsOpen(true);
  };

  const openWithTask = (task: ITask) => {
    setSelected(task);
    setIsOpen(true);
  };

  const close = () => {
    setSelected(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    selected,
    openForNew,
    openWithTask,
    close,
  };
};
