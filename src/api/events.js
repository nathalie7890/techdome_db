export const getEvents = async (filters) => {
  const res = await fetch(`${process.env.REACT_APP_API_URI}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });

  const data = await res.json();
  return data;
};

export const uploadEvent = async (file, newEvent) => {
  try {
    const { name, uploadBy } = newEvent;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("uploadBy", uploadBy);
    formData.append("csv", file);

    const res = await fetch(`${process.env.REACT_APP_API_URI}/events/new`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const editEvent = async (id, name) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

export const deleteEvent = async (id) => {
  const res = await fetch(`${process.env.REACT_APP_API_URI}/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Client: Failed to delete event.");
  const data = await res.json();
  return data;
};

export const deleteManyEvent = async (events) => {
  const id = [];
  for (let i of events) {
    id.push(i.id);
  }

  const res = await fetch(`${process.env.REACT_APP_API_URI}/events`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });

  if (!res.ok) throw new Error("Client: Events cannot be deleted.");
  else return res.ok;
};
