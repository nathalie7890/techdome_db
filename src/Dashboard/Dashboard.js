import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import Table from "./Table";
import { Participants } from "../sampleData";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(Participants);

  const nameFilterHandler = (name) => {
    const filterData = Participants.filter((participant) => {
      if (participant.Name.toLowerCase().includes(name.toLowerCase())) {
        return participant;
      }
    });

    setData(filterData);
  };

  const eventFilterHandler = (event) => {
    const filterData = Participants.filter((participant) => {
      if (participant.Event.toLowerCase().includes(event.toLowerCase())) {
        return participant;
      }
    });

    setData(filterData);
  };

  const icFilterHandler = (ic) => {
    const filterData = Participants.filter((participant) => {
      if (participant["IC Number"].toString().includes(ic)) {
        return participant;
      }
    });

    setData(filterData);
  };

  const schoolOrgFilterHandler = (schoolOrg) => {
    const filterData = Participants.filter((participant) => {
      if (
        participant["School/Organisation"]
          .toLowerCase()
          .includes(schoolOrg.toLowerCase())
      ) {
        return participant;
      }
    });

    setData(filterData);
  };

  const ageFilterHandler = (age) => {
    console.log(age);
    const filterData = Participants.filter((participant) => {
      if (age == 0) {
        return participant.age < 10;
      }
      if (participant.age >= age && participant.age <= parseInt(age) + 9) {
        return participant;
      }
    });

    setData(filterData);
  };

  // useEffect(() => {
  //   const fetchParticipants = async () => {
  //     const res = await axios.get("http://localhost:5000/participants");
  //     setData(res.data);
  //     setIsLoading(true)
  //   };
  //   fetchParticipants();
  // }, []);

  console.log(data);
  return (
    <div className="min-h-[100vh] border-4 border-yellow-400 bg-white p-12">
      <div className="flex justify-center">
        <Filter
          onNameFilter={nameFilterHandler}
          onEventFilter={eventFilterHandler}
          onSchoolOrgFilter={schoolOrgFilterHandler}
          onIcFilter={icFilterHandler}
          onAgeFilter={ageFilterHandler}
        />
      </div>
      {/* {isLoading ? <Table data={data} /> : null} */}
      <Table data={data} />
    </div>
  );
};

export default Dashboard;
