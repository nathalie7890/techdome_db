export const getAllParticipants = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URI}`);
  if (!res.ok) throw new Error("Cannot get all participants");
  const data = await res.json();
  return data;
};

export const getAll = async (filters) => {
  const res = await fetch(`${process.env.REACT_APP_API_URI}/participants/all`, {
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

export const AddParticipant = async (participant) => {
  const res = await fetch(`${process.env.REACT_APP_API_URI}/participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  });
  if (!res.ok) throw new Error("Cannot add participant");
  const data = await res.json();
  return data;
};

export const deleteParticipant = async (id) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URI}/participants/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) console.error(`Failed to delete participant ${id}`);
  const data = await res.json();
  return data;
};

export const editParticipant = async (participant, id) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URI}/participants/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participant),
    }
  );

  if (!res.ok) console.error(`Failed to edit participant ${id}`);
  const data = await res.json();
  return data;
};

export const deleteMany = async (name, participants) => {
  console.log(name, participants);
  const res = await fetch(`${process.env.REACT_APP_API_URI}/participants`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, id: participants }),
  });

  if (!res.ok) console.error("Failed to delete participants");
  const data = await res.json();
  return data;
};
