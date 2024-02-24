const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export const getAddress = async (position) => {
  const res = await fetch(
    `${URL}?latitude=${position.latitude}&longitude=${position.longitude}`,
  );
  if (!res.ok) throw new Error("Error fetching position from api");
  const data = await res.json();
  return data;
};
