import tryConnect from "./lib/tryConnect";
import localPlayerHandlers from "./lib/handlers/localPlayer";
import remotePlayerHandlers from "./lib/handlers/remotePlayer";
import mapLoadHandlers from "./lib/handlers/mapLoad";

const socket = tryConnect();

socket.on("connect", () => {
    localPlayerHandlers(socket);
    remotePlayerHandlers(socket);
    mapLoadHandlers(socket);
});