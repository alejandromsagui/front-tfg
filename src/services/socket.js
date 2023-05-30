
import io from "socket.io-client"
export const socket = io("https://namekiansgames-backend.herokuapp.com", {
  withCredentials: true
});