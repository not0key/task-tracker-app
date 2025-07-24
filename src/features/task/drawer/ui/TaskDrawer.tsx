import { Drawer, Typography, Stack, Divider, Button } from "@mui/material";
import { useTaskStore, type ITask } from "@entities/task";
import { TaskForm } from "@features/task/form";
import type { FC } from "react";

interface ITaskDrawerProps {
  open: boolean;
  selected: ITask | null;
  onClose: () => void;
}

export const TaskDrawer: FC<ITaskDrawerProps> = ({
  open,
  selected,
  onClose,
}) => {
  const { removeTask } = useTaskStore();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: 425, p: 2 } } }}
    >
      <Stack spacing={2}>
        <Typography variant="h6">
          {selected ? "Редактирование задачи" : "Новая задача"}
        </Typography>

        <TaskForm task={selected || undefined} onClose={onClose} />

        {selected && (
          <>
            <Divider />
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                removeTask(selected.id);
                onClose();
              }}
            >
              Удалить задачу
            </Button>
          </>
        )}
      </Stack>
    </Drawer>
  );
};
