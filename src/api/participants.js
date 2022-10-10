export const getAllParticipants = async () => {
  const res = await fetch("http://localhost:5000/participants");
  if (!res.ok) throw new Error("Cannot get all participants");
  const data = await res.json();
  return data;
};

export const getAll = async (filters) => {
  const res = await fetch("http://localhost:5000/participants/all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });

  if (!res.ok) throw new Error("Cannot fetch participants");
  const data = await res.json();
  return data;
};

export const filterByEvent = async (event, schoolOrg, age) => {
  const res = await fetch(`http://localhost:5000/participants/event/${event}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ schoolOrg, age }),
  });

  if (!res.ok) throw new Error("Cannot find participant from this event");
  const data = await res.json();
  return data;
};

export const filterBySchoolOrg = async (schoolOrg, event, age) => {
  const res = await fetch(
    `http://localhost:5000/participants/schoolOrg/${schoolOrg}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event, age }),
    }
  );

  if (!res.ok)
    throw new Error("Cannot find participants from this school/organisation");
  const data = await res.json();
  return data;
};

export const filterByAge = async (age, event, schoolOrg) => {
  const res = await fetch(`http://localhost:5000/participants/age/${age}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event, schoolOrg }),
  });
  if (!res.ok) throw new Error("Cannot find participants form this age range");
  const data = await res.json();
  return data;
};

export const filterByName = async (name, event, schoolOrg, age) => {
  const res = await fetch(`http://localhost:5000/participants/name/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event, schoolOrg, age }),
  });

  if (!res.ok) throw new Error("Cannot find participants with this name");
  const data = await res.json();
  return data;
};

export const filterByIC = async (ic, event, schoolOrg, age) => {
  const res = await fetch(`http://localhost:5000/participants/ic/${ic}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event, schoolOrg, age }),
  });

  if (!res.ok) throw new Error("Cannot find participants with this IC");
  const data = await res.json();
  return data;
};

export const deleteParticipant = async (id) => {
  const res = await fetch(`http://localhost:5000/participants/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) console.error(`Failed to delete participant ${id}`);
  const data = res.json();
  return data;
};

export const editParticipant = async (participant, id) => {
  const res = await fetch(`http://localhost:5000/participants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  });

  if (!res.ok) console.error(`Failed to delete participant ${id}`);
  const data = res.json();
  return data;
};

export const deleteMany = async (participants) => {
  const res = await fetch("http://localhost:5000/participants", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: participants }),
  });

  if (!res.ok) console.error("Failed to delete participants");
  const data = res.json();
  return data;
};
