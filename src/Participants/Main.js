import { useState } from "react";
import { useQuery } from "react-query";
import Table from "./Table/Table";
import LoadingBar from "./LoadingBar";
import { getAllParticipants, getAll } from "../api/participants";

const Main = () => {

  const [filters, setFilters] = useState({
    event: "all",
    schoolOrg: "all",
    age: "all",
    name: "all",
    ic: "all",
  });

  const { data, isLoading } = useQuery( 
    ["participants", filters],
    async () => await getAll(filters)
  );

  const { data: rawData, isLoading: rawDataLoading } = useQuery(
    ["rawData"],
    async () => await getAllParticipants()
  );

  return (
    <div className="min-h-screen p-24 bg-white">
      {isLoading || rawDataLoading ? (
        <LoadingBar />
      ) : (
        <Table
          data={data}
          rawData={rawData}
          setFilters={setFilters}
          filters={filters}
        />
      )}
    </div>
  );
};

export default Main;
