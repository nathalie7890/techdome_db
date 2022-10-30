import { useState } from "react";
import { useQuery } from "react-query";
import Table from "./Table/Table";
import LoadingBar from "./LoadingBar";
import { Logout } from "../api/users";
import { FiLogOut } from "react-icons/fi";
import { Tooltip } from "flowbite-react";
import { getAll } from "../api/participants";
import { useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  const { event } = location.state;
  const [filters, setFilters] = useState({
    event: event,
    schoolOrg: "",
    ageFrom: 0,
    ageTo: 200,
    name: "",
    ic: "",
    ageSort: "",
  });

  const { data, isLoading } = useQuery(
    ["participants", filters],
    async () => await getAll(filters)
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
        {isLoading ? (
          <LoadingBar />
        ) : (
          <Table data={data} setFilters={setFilters} filters={filters} event={event}/>
        )}
      </div>
    </div>
  );
};

export default Main;
