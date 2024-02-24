const API_URL = "https://react-fast-pizza-api.onrender.com/api";
const API_URL2 = "http://localhost:8000";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw new Error("Failed getting menu");
  const { data } = await res.json();
  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL2}/orders/${id}`);
  if (!res.ok) throw new Error("Cant find Order");
  const data = await res.json();
  return data;
}

export async function updateOrder(id, updatedOrder) {
  try {
    const res = await fetch(`${API_URL2}/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error("res is not ok");
    const data = await res.json();
    return data;
  } catch {
    throw Error("Failed Creating Your Order !");
  }
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL2}/orders`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error("res is not ok");
    const data = await res.json();
    return data;
  } catch {
    throw Error("Failed Creating Your Order !");
  }
}
