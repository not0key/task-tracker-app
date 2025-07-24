import { Paper, Stack, TextField, Button } from "@mui/material";
import type { FC } from "react";

interface ITaskFilterPanelProps {
  search: string;
  startDate: string;
  endDate: string;
  onSearchChange: (v: string) => void;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
  onAddClick: () => void;
}

export const TaskFilterPanel: FC<ITaskFilterPanelProps> = ({
  search,
  startDate,
  endDate,
  onSearchChange,
  onStartDateChange,
  onEndDateChange,
  onAddClick,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        px: 4,
        py: 2,
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Button variant="contained" onClick={onAddClick}>
          Добавить задачу
        </Button>

        <TextField
          label="Поиск"
          variant="outlined"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <TextField
          label="Начало"
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <TextField
          label="Окончание"
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Stack>
    </Paper>
  );
};
