import axios from "axios";
import config from "../../config";

//this component is used to get data from the backend and communicate with rest api
export const getData = async () => {
  const API_URL = config.host;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
