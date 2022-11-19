import { useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../api/users";
import ContactTable from "./ContactTable";
import SideNav from "../Events/SideNav";
import LoadingBar from "../LoadingBar/LoadingBar";

export default function Contacts() {
  const [filters, setFilters] = useState({
    search: "",
    nameAlpha: "",
    isAdmin: "",
  });

  const [editOpen, setEditOpen] = useState({
    visible: false,
    name: "",
  });

  const { data, isLoading, error, isError } = useQuery(
    ["users", filters],
    async () => await getUsers(filters)
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
  } else {
    return (
      <div className="flex w-full min-h-screen">
        <div
          className={`${
            editOpen.visible ? "w-16" : "w-3/12"
          } bg-gradient-to-tr from-[#3f51b5]  to-purple-500 sticky top-0`}
        >
          <SideNav editOpen={editOpen} />
        </div>
        <ContactTable
          data={data}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    );
  }
}
