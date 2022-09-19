import tryConnect from "./lib/tryConnect";
import localPlayerHandlers from "./lib/handlers/localPlayer";
import remotePlayerHandlers from "./lib/handlers/remotePlayer";

const socket = tryConnect();

socket.on("connect", () => {
    localPlayerHandlers(socket);
    remotePlayerHandlers(socket);
});