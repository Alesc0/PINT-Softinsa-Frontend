import { io } from "socket.io-client";
import { getTokens } from "utils/sessionManager";
import { baseURL } from "./_axios";

const socket = io.connect(baseURL, {
  query: { token: getTokens().jwt, env: "web" },
});
export default socket;
