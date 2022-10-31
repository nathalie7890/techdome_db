export const getEvents = async (filters) => {
  const res = await fetch("http://localhost:5000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });

  const data = res.json();
  return data;
};

export const uploadEvent = async (file, newEvent) => {
 
  const { name, uploadBy } = newEvent;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("uploadBy", uploadBy);
  formData.append("csv", file);

  const res = await fetch(`http://localhost:5000/events/new`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Client: Failed to upload file");
  else return res.ok;
};

export const editEvent = async (id, name) => {
  const res = await fetch(`http://localhost:5000/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Client: Failed to update event name.");

  const data = res.json();
  return data;
};

export const deleteEvent = async (id) => {
  const res = await fetch(`http://localhost:5000/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Client: Failed to delete event.");
  const data = res.json();
  return data;
};

export const deleteManyEvent = async (events) => {
  const res = await fetch("http://localhost:5000/events", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: events }),
  });

  if (!res.ok) throw new Error("Client: Events cannot be deleted.");
  else return res.ok;
};
