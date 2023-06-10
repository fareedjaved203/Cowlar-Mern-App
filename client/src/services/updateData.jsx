import axios from "axios";

export const updateData = async (id) => {
  const API_URL = import.meta.env.VITE_API;

  try {
    const response = await axios.put(`${API_URL}${id}`, {
      status: "completed",
    });
  } catch (error) {
    console.log(error);
  }
};
