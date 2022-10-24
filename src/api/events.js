export const getEvents = async (search) => {
  const res = await fetch("http://localhost:5000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: search }),
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
