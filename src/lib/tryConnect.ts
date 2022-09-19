import { io, Socket } from "socket.io-client";

export default function() {
    const serverUrl = prompt("Please enter the URL of the server you wish to connect to (formatted as ws://127.0.0.1:3000).");

    if (!serverUrl) {
        // TODO: Don't throw
        throw new Error("Server URL invalid!");
    }

    const socket: Socket<ClientToServerEvents, ServerToClientEvents> = io(serverUrl, {
        autoConnect: false,
    });

    const username = prompt("What should we call you?");

    socket.auth = {
        username: username || "Lea"
    }

    socket.connect();

    return socket;
}