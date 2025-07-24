import { useState } from "react";

export const useTaskFilters = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return {
    search,
    startDate,
    endDate,
    setSearch,
    setStartDate,
    setEndDate,
  };
};
