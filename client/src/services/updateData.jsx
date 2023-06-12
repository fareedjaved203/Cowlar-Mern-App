import axios from "axios";
import config from "../../config";

//this component is used to update data status from the backend (db) and communicate with rest api

export const updateData = async (id) => {
  const API_URL = config.host;

  try {
    const response = await axios.put(`${API_URL}${id}`, {
      status: "completed",
    });
  } catch (error) {
    console.log(error);
  }
};
