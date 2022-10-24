import { useState } from "react";
import { useQuery } from "react-query";
import UploadEvent from "./UploadEvent";
import EventTable from "./EventTable";
import LoadingBar from "../Participants/LoadingBar";
import { getEvents } from "../api/events";

export default function EventList() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useQuery(
    ["events", search],
    async () => await getEvents(search)
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
      <div className="flex w-full min-h-screen bg-white">
        <div className="w-2/12 bg-darkBlue"></div>
        <div className="w-10/12 px-8">
          <UploadEvent />
          <EventTable data={data} setSearch={setSearch} />
        </div>
      </div>
    );
}
