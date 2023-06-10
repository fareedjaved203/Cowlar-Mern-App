import axios from "axios";

export const removeData = async (id) => {
  const API_URL = import.meta.env.VITE_API;

  try {
    const response = await axios.delete(`${API_URL}${id}`);
  } catch (error) {
    console.log(error);
  }
};
