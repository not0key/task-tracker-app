import { useState, type FC } from "react";
import type { ITask, TTaskStatus } from "@entities/task";
import { useTaskStore } from "@entities/task";
import { nowLocalISOString } from "@shared/lib";

import { Box, TextField, MenuItem, Button } from "@mui/material";

interface ITaskFormProps {
  task?: ITask;
  onClose: () => void;
}

export const TaskForm: FC<ITaskFormProps> = ({ task, onClose }) => {
  const isEdit = !!task;
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [startDate, setStartDate] = useState(
    task?.startDate || nowLocalISOString()
  );
  const [endDate, setEndDate] = useState(task?.endDate || "");
  const [status, setStatus] = useState<TTaskStatus>(task?.status || "todo");

  const { addTask, updateTask } = useTaskStore();

  const handleSubmit = () => {
    if (!title.trim()) return;
    const newTask = { title, description, startDate, endDate, status };
    if (isEdit && task) {
      updateTask({ ...task, ...newTask });
    } else {
      addTask(newTask);
    }
    onClose();
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Название задачи"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Описание"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Дата начала"
        type="datetime-local"
        value={startDate.slice(0, 16)}
        onChange={(e) => setStartDate(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        label="Дата окончания"
        type="datetime-local"
        value={endDate.slice(0, 16)}
        onChange={(e) => setEndDate(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        label="Статус"
        select
        value={status}
        onChange={(e) => setStatus(e.target.value as TTaskStatus)}
      >
        <MenuItem value="todo">К выполнению</MenuItem>
        <MenuItem value="in_progress">В процессе</MenuItem>
        <MenuItem value="ready">Готово</MenuItem>
      </TextField>
      <Button variant="contained" onClick={handleSubmit}>
        {isEdit ? "Сохранить изменения" : "Создать задачу"}
      </Button>
    </Box>
  );
};
