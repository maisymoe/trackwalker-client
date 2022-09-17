import { io, Socket } from "socket.io-client";

const serverUrl = prompt("Please enter the URL of the server you wish to connect to (formatted as ws://127.0.0.1:3000).");

if (!serverUrl) {
    // TODO: Don't throw
    throw new Error("Server URL invalid!");
}

const socket: Socket<ClientToServerEvents> = io(serverUrl, {
    autoConnect: false,
    auth: {
        username: "Lea"
    }
});

const username = prompt("What should we call you?");
socket.auth = {
    username: username
}

socket.connect();

ig.ENTITY.Player.inject({
    update() {
        this.parent();
        // @ts-expect-error
        if (this.coll.vel.x !== 0 || this.coll.vel.y !== 0) {
            socket.emit("updatePosition", {
                ...this.coll.pos,
                // @ts-expect-error
                roomName: ig.game.mapName,
            });
        }
    },
});