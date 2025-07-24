import { Box } from "@mui/material";
import { filterTasks, useTaskStore } from "@entities/task";
import { TaskFilterPanel, useTaskFilters } from "@features/task/filters";
import { TaskBoard } from "@widgets/task-board";
import { TaskDrawer, useTaskDrawer } from "@features/task/drawer";

export const TaskPage = () => {
  const { tasks } = useTaskStore();
  const drawer = useTaskDrawer();
  const { search, startDate, endDate, setSearch, setStartDate, setEndDate } =
    useTaskFilters();

  const filteredTasks = filterTasks(tasks, { search, startDate, endDate });

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <TaskFilterPanel
        search={search}
        startDate={startDate}
        endDate={endDate}
        onSearchChange={setSearch}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onAddClick={drawer.openForNew}
      />

      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <TaskBoard tasks={filteredTasks} onTaskSelect={drawer.openWithTask} />
      </Box>

      <TaskDrawer
        open={drawer.isOpen}
        selected={drawer.selected}
        onClose={drawer.close}
      />
    </Box>
  );
};
