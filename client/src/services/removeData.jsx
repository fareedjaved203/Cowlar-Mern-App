import axios from "axios";
import config from "../../config";

//this component is used to remove data from the backend and communicate with rest api

export const removeData = async (id) => {
  const API_URL = config.host;

  try {
    const response = await axios.delete(`${API_URL}${id}`);
  } catch (error) {
    console.log(error);
  }
};
