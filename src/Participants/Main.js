import { useState } from "react";
import { useQuery } from "react-query";
import Table from "./Table/Table";
import LoadingBar from "./LoadingBar";
import { Logout } from "../api/users";
import { FiLogOut } from "react-icons/fi";
import { Tooltip } from "flowbite-react";
import { getAllParticipants, getAll } from "../api/participants";

const Main = () => {
  const [filters, setFilters] = useState({
    event: "all",
    schoolOrg: "all",
    // age: "all",
    ageFrom: 0,
    ageTo: 100,
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

  const LogoutHandler = () => {
    Logout();
    window.location.reload();
  };

  return (
    <div className="relative flex min-h-screen bg-lightBlue">
      <div className="sticky top-0 flex flex-col justify-between w-20 h-screen p-4 py-12 bg-darkBlue">
        <div className="flex flex-col items-center justify-center"></div>
        <div className="flex flex-col items-center justify-center">
          <Tooltip content="Logout">
            <button
              className="text-2xl text-gray-400 rounded-md hover:text-white"
              onClick={LogoutHandler}
            >
              <FiLogOut />
            </button>
          </Tooltip>
        </div>
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
