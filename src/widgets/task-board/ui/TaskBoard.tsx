import type { FC } from "react";
import { Grid } from "@mui/material";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import type { ITask } from "@entities/task";
import {
  useTaskStore,
  TaskColumn,
  getStatusLabel,
  TASK_STATUSES,
} from "@entities/task";

interface ITaskBoardProps {
  tasks: ITask[];
  onTaskSelect: (task: ITask) => void;
}

export const TaskBoard: FC<ITaskBoardProps> = ({ tasks, onTaskSelect }) => {
  const { updateTaskStatus } = useTaskStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    updateTaskStatus(draggableId, destination.droppableId as ITask["status"]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid
        container
        spacing={0}
        sx={{ flexWrap: "nowrap", overflowX: "auto", p: 4, gap: 3 }}
      >
        {TASK_STATUSES.map((status) => (
          <TaskColumn
            key={status}
            droppableId={status}
            title={getStatusLabel(status)}
            tasks={tasks.filter((t) => t.status === status)}
            onSelect={onTaskSelect}
          />
        ))}
      </Grid>
    </DragDropContext>
  );
};
