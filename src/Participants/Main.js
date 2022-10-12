import { useState } from "react";
import { useQuery } from "react-query";
import Table from "./Table/Table";
import LoadingBar from "./LoadingBar";
import { getAllParticipants, getAll } from "../api/participants";
import { Modal, Button } from "flowbite-react";

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
    <div className="relative flex min-h-screen bg-lightBlue">
      <div className="sticky top-0 w-20 h-screen bg-darkBlue">
        <h1 className="font-bold text-center text-gray-100">Hi</h1>
      </div>
      <div>
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
    </div>
  );
};

export default Main;
