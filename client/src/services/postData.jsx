import axios from "axios";
import config from "../../config";

//this component is used to send data to the backend and communicate with rest api
export const postData = async (inputValue) => {
  const API_URL = config.host;

  try {
    await axios.post(API_URL, {
      inputValue,
    });
  } catch (error) {
    console.log(error);
  }
};
