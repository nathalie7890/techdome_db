//fetch participants
export const getAll = async (filters) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URI}/participants/all`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(filters),
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

//delete one participant
export const deleteParticipant = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URI}/participants/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

//delete many participants
export const deleteMany = async (name, participants) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/participants`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name: name, id: participants }),
    });

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

//edit participant
export const editParticipant = async (participant, id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URI}/participants/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(participant),
      }
    );

    const data = res.json();
    if (res.ok) return data;
  } catch (e) {
    throw new Error(e);
  }
};
