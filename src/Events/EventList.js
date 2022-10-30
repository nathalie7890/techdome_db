import { useState } from "react";
import { useQuery } from "react-query";
import EventTable from "./EventTable";
import LoadingBar from "../Participants/LoadingBar";
import { getEvents } from "../api/events";
import SideNav from "./SideNav";

export default function EventList() {
  const [filters, setFilters] = useState({
    search: "",
    eventAlpha: "",
    eventYear: "dsc",
  });
  const [editOpen, setEditOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery(
    ["events", filters],
    async () => await getEvents(filters)
  );

  
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
      <div className="relative flex w-full max-h-screen min-h-screen p-2 bg-lightBlue">
        <div className={`${editOpen ? "w-16" : "w-3/12"} bg-darkBlue rounded-lg`}>
          <SideNav editOpen={editOpen}/>
        </div>
        <div className="w-full h-full bg-lightBlue">
          <EventTable
            data={data}
            filters={filters}
            setFilters={setFilters}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
          />
        </div>
      </div>
    );
}
