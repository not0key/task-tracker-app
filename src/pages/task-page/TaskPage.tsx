import { Box } from "@mui/material";
import { useState } from "react";
import { useTaskStore } from "@entities/task";
import { TaskFilterPanel } from "@features/task/filters";
import { TaskBoard } from "@widgets/task-board";
import { TaskDrawer, useTaskDrawer } from "@features/task/drawer";

export const TaskPage = () => {
  const { tasks } = useTaskStore();
  const drawer = useTaskDrawer();

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = tasks.filter((t) => {
    const titleMatch = t.title.toLowerCase().includes(search.toLowerCase());
    const taskStart = new Date(t.startDate);
    const afterStart =
      startDate === "" || taskStart >= new Date(startDate + "T00:00:00");
    const beforeEnd =
      endDate === "" || taskStart <= new Date(endDate + "T23:59:59");

    return titleMatch && afterStart && beforeEnd;
  });

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
        <TaskBoard tasks={filtered} onTaskSelect={drawer.openWithTask} />
      </Box>

      <TaskDrawer
        open={drawer.isOpen}
        selected={drawer.selected}
        onClose={drawer.close}
      />
    </Box>
  );
};
