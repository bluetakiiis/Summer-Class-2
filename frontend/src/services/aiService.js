const API_URL = "http://localhost:5000/api/ai";

export const sendMessageToAI = async (message, history) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact AI");
  }

  return response.json();
};
