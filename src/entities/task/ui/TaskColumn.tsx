import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Typography, Box } from "@mui/material";
import { TaskCard, type ITask } from "@entities/task";
import type { FC } from "react";

interface ITaskColumnProps {
  title: string;
  tasks: ITask[];
  onSelect: (task: ITask) => void;
  droppableId: string;
}

export const TaskColumn: FC<ITaskColumnProps> = ({
  title,
  tasks,
  onSelect,
  droppableId,
}) => (
  <Box
    sx={{
      width: 375,
      flexShrink: 0,
    }}
  >
    <Typography variant="h5" fontWeight="bold" mb={2}>
      {title}
    </Typography>
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            minHeight: "80vh",
            backgroundColor: "#f4f4f4",
            borderRadius: 2,
            p: 1,
            overflowY: "auto",
          }}
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{ mb: 1 }}
                  onClick={() => onSelect(task)}
                >
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onSelect(task)}
                  />
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  </Box>
);
