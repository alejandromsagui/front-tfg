
import io from "socket.io-client"
export const socket = io("https://namekiansgames.herokuapp.com", {
  withCredentials: true
});