import axios from "axios";
import config from "../../config";

//this component is used to remove data from the backend and communicate with rest api

export const removeData = async (id) => {
  const API_URL = config.host;

  try {
    const response = await axios.delete(`${API_URL}${id}`);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
