import { useState } from "react";
import { useQuery } from "react-query";
import EventTable from "./EventTable";
import LoadingBar from "../Partials/LoadingBar";
import { getEvents } from "../api/events";
import SideNav from "../Partials/SideNav";
import MobileNav from "../Partials/MobileNav";
import { styles } from "./styles/EventList.styles";

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

  if (isError) {
    return (
      <div className={styles.errorPage}>
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
      <div className={styles.mainContainer}>
        <MobileNav />
        <div className={styles.eventContainer}>
          <div
            className={`${styles.sideNav} ${
              editOpen.visible ? "w-16" : "w-3/12"
            }`}
          >
            <SideNav editOpen={editOpen} />
          </div>
          <div className={styles.eventTable}>
            <EventTable
              data={data}
              filters={filters}
              setFilters={setFilters}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
            />
          </div>
        </div>
      </div>
    );
}
