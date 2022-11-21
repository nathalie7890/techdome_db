import { useState } from "react";
import { useQuery } from "react-query";
import EventTable from "./EventTable";
import LoadingBar from "../Partials/LoadingBar";
import { getEvents } from "../api/events";
import SideNav from "./SideNav";
import BottomNav from "../Partials/BottomNav";

export default function EventList() {
  const [filters, setFilters] = useState({
    search: "",
    eventAlpha: "",
    eventYear: "dsc",
  });
  const [editOpen, setEditOpen] = useState({
    visible: false,
  });

  const { data, isLoading, isError, error } = useQuery(
    ["events", filters],
    async () => await getEvents(filters)
  );

  if(!isLoading) console.log(data)
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>{error}</h1>
      </div>
    );
  } else if (isLoading) {
    return (
      <div>
        <LoadingBar />
      </div>
    );
  } else
    return (
      <div className="relative flex flex-col">
        <div className="relative flex w-full min-h-screen bg-cyan-400">
          <div
            className={`${
              editOpen.visible ? "w-16" : "w-3/12"
            } bg-gradient-to-tr from-[#3f51b5]  to-purple-500 sticky top-0 hidden md:block`}
          >
            <SideNav editOpen={editOpen} />
          </div>
          <div className="w-full bg-white">
            <EventTable
              data={data}
            filters={filters}
              setFilters={setFilters}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
            />
          </div>
        </div>
        <div className="sticky bottom-0 h-16 bg-gradient-to-tr from-[#3f51b5] to-purple-500 md:hidden">
          <BottomNav />
        </div>
      </div>
    );
}
