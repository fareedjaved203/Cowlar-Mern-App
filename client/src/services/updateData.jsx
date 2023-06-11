import axios from "axios";

//this component is used to update data status from the backend (db) and communicate with rest api

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
