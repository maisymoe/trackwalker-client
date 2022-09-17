import tryConnect from "./lib/tryConnect";
import playerHandlers from "./lib/playerHandlers";

const socket = tryConnect();

socket.on("connect", () => {
    playerHandlers(socket);

    socket.on("playerUpdate", (playerName, pos) => {
        console.log(playerName, pos);
    });
});