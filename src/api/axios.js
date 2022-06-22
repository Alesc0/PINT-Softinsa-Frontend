import axios from "axios";
import { getTokens } from "../utils/sessionManager";

const instance = axios.create({
  baseURL: "https://pintbackendoriginal.herokuapp.com",
  headers: { Authorization: `Bearer ${getTokens()[0]}` },
});

export default instance;
