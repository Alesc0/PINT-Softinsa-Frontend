import axios from "axios";

const instance = axios.create({
  baseURL: "https://pintbackendoriginal.herokuapp.com",
});

export default instance;
