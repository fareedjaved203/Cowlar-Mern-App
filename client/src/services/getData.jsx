import axios from "axios";

//this component is used to get data from the backend and communicate with rest api
export const getData = async () => {
  const API_URL = import.meta.env.VITE_API;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
