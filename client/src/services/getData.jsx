import axios from "axios";
import config from "../../config";

//this component is used to get data from the backend and communicate with rest api
export const getData = async () => {
  const API_URL = config.host;
  try {
    const response = await axios.get(API_URL);
    return response.data;
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
