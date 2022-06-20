import axios from "axios";
import { getTokens } from "../utils/sessionManager";

let jwt = getTokens()[0];

const instance = axios.create({
  baseURL: "https://pintbackendoriginal.herokuapp.com",
  headers: { Authorization: `Bearer ${jwt}` },
});

export default instance;
