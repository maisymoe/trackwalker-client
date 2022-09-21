import { io, Socket } from "socket.io-client";
import logger from "./logger";

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
        username: username || "Lea",
    }

    logger.log(`Attempting to connect to ${serverUrl}...`);

    try {
        socket.connect();
    } catch(e) {
        logger.error(`Failed to connect! ${e}`);
        throw new Error("Failed to connect to the server...");
    }

    logger.log("Connected!");

    return socket;
}