import type { ITask } from "@entities/task/model/task.model";
import { formatDate } from "@shared/lib";
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import type { FC } from "react";
import { getStatusColor, getStatusLabel } from "../lib/taskStatusUtils";

interface ITaskCardProps {
  task: ITask;
  onClick: () => void;
}

export const TaskCard: FC<ITaskCardProps> = ({ task, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      mb: 2,
      cursor: "pointer",
      width: "100%",
      borderRadius: 2,
      boxShadow: 1,
      transition: "0.2s",
      "&:hover": {
        boxShadow: 4,
        backgroundColor: "action.hover",
      },
    }}
    variant="outlined"
  >
    <CardContent>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        spacing={1}
      >
        <Typography variant="h6" fontWeight="bold">
          {task.title}
        </Typography>
        <Chip
          label={getStatusLabel(task.status)}
          color={getStatusColor(task.status)}
          size="small"
        />
      </Stack>

      {task.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, mb: 1 }}
        >
          {task.description}
        </Typography>
      )}

      <Box sx={{ fontSize: 13, color: "text.secondary" }}>
        <Typography component="div">
          Дата начала: {formatDate(task.startDate)}
        </Typography>
        {task.endDate && (
          <Typography component="div">
            Дата завершения: {formatDate(task.endDate)}
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);
