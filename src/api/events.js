//fetch events
export const getEvents = async (filters) => {
  const res = await fetch(`${process.env.REACT_APP_API_URI}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(filters),
  });

  const data = await res.json();
  return data;
};

//upload event
export const uploadEvent = async (file, newEvent) => {
  try {
    const { name } = newEvent;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("csv", file);

    const res = await fetch(`${process.env.REACT_APP_API_URI}/events/new`, {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

//add participant to event
export const updateEvent = async (file, name) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("csv", file);

    const res = await fetch(`${process.env.REACT_APP_API_URI}/events/update`, {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });

    console.log(res);
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

//edit event's name
export const editEvent = async (id, name) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) return res.status.toString();
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

//delete one event
export const deleteEvent = async (id) => {
  const res = await fetch(`${process.env.REACT_APP_API_URI}/events/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  if (!res.ok) throw new Error("Client: Failed to delete event.");
  const data = await res.json();
  return data;
};

//delete many events
export const deleteManyEvent = async (events) => {
  const id = [];
  for (let i of events) {
    id.push(i.id);
  }

  const res = await fetch(`${process.env.REACT_APP_API_URI}/events`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ id: id }),
  });

  if (!res.ok) throw new Error("Client: Events cannot be deleted.");
  else return res.ok;
};
