import { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { getAllParticipants } from "../api/participants";
import axios from "axios";
import Filter from "./Filter";
import Table from "./Table";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState();
  const [data, setData] = useState();
  const [clearChecked, setClearChecked] = useState(false);
  const [filtered, setFiltered] = useState();
  console.log(filtered);
  const schoolOrgOptions = () => {
    return [
      ...new Set(
        rawData.map((participant) => participant["School/Organisation"])
      ),
    ];
  };

  const eventOptions = () => {
    return [
      ...new Set(
        rawData.map((participant) =>
          participant.Event.split(" ").slice(0, -1).join(" ")
        )
      ),
    ];
  };

  const fetchParticipants = async () => {
    const res = await axios.get("http://localhost:5000/participants/");
    setRawData(res.data);
    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  //console.log(data);
  console.log(filtered);

  return (
    <div className="min-h-[100vh] border-yellow-400 bg-white p-12">
      {!isLoading ? (
        <>
          <Filter
            schoolOrgs={schoolOrgOptions()}
            eventOptions={eventOptions()}
            setData={setData}
            setClearChecked={setClearChecked}
            setFiltered={setFiltered}
          />

          <Table
            data={data}
            clearChecked={clearChecked}
            filtered={filtered}
            setData={setData}
          />
        </>
      ) : (
        <h1 className="text-3xl font-medium text-slate-700">
          A moment please. We're trying very hard to fetch the data
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
