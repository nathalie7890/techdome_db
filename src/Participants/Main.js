import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Table from "./Table/Table";
import LoadingBar from "../LoadingBar/LoadingBar";
import SideNav from "../Events/SideNav";
import { getAll } from "../api/participants";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state === null) navigate("/");
  }, []);

  const event = location.state?.event;
  const [editOpen, setEditOpen] = useState({ visible: true });
  const [filters, setFilters] = useState({
    event: event,
    schoolOrg: "",
    ageFrom: 0,
    ageTo: 200,
    name: "",
    ic: "",
    ageSort: "",
    nameSort: "",
  });

  const { data, isLoading, error, isError, } = useQuery(
    ["participants", filters],
    async () => await getAll(filters)
  );

  if (isError) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-white">
      <div
        className={`${
          editOpen.visible ? "w-16" : "w-3/12"
        } bg-gradient-to-tr from-[#3f51b5]  to-purple-500 sticky top-0`}
      >
        <SideNav editOpen={editOpen} />
      </div>

      <div>
        {isLoading ? (
          <LoadingBar />
        ) : (
          <Table
            data={data}
            setFilters={setFilters}
            filters={filters}
            event={event}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
