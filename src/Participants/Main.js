import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Table from "./Table";
import LoadingBar from "../Partials/LoadingBar";
import SideNav from "../Partials/SideNav";
import MobileNav from "../Partials/MobileNav";
import { getAll } from "../api/participants";
import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "./styles/Main.styles";

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
    nameSort: "asc",
  });

  const { data, isLoading, error, isError } = useQuery(
    ["participants", filters],
    async () => await getAll(filters)
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
      <div className="relative flex flex-col">
        <MobileNav />
        <div className="relative flex min-h-screen bg-white">
          <div
            className={`${editOpen.visible ? "w-16" : "w-3/12"} ${
              styles.sideNavContainer
            }`}
          >
            <SideNav editOpen={editOpen} />
          </div>

          <div>
            <Table
              data={data}
              setFilters={setFilters}
              filters={filters}
              event={event}
            />
          </div>
        </div>
      </div>
    );
};

export default Main;
