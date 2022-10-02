import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import Table from "./Table";
import { Participants } from "../sampleData";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(Participants);
  const schoolOrgOptions = () => {
    return [
      ...new Set(
        Participants.map((participant) => participant["School/Organisation"])
      ),
    ];
  };

  const eventOptions = () => {
    return [
      ...new Set(
        Participants.map((participant) =>
          participant.Event.split(" ").slice(0, -1).join(" ")
        )
      ),
    ];
  };

  // useEffect(() => {
  //   const fetchParticipants = async () => {
  //     const res = await axios.get("http://localhost:5000/participants");
  //     setData(res.data);
  //     setIsLoading(true)
  //   };
  //   fetchParticipants();
  // }, []);

  // console.log(data);
  return (
    <div className="min-h-[100vh]  border-yellow-400 bg-[#cfd6e8] p-12">
      <Filter
        schoolOrgs={schoolOrgOptions()}
        eventOptions={eventOptions()}
        setData={setData}
      />

      {/* {isLoading ? <Table data={data} /> : null} */}
      <Table data={data} s />
    </div>
  );
};

export default Dashboard;

