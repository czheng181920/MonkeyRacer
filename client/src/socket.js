import { io } from "socket.io-client";

// production version will compute URL from window.location object
const url = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:5001';

export const socket = io(url, {
    autoConnect: false,
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:3000/",
    }
});