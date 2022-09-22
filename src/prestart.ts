import connect from "./lib/connect";
import localPlayerHandlers from "./lib/handlers/localPlayer";
import remotePlayerHandlers from "./lib/handlers/remotePlayer";
import mapLoadHandlers from "./lib/handlers/mapLoad";

// TODO: Move connection to a button on TitleScreenGui
const socket = connect();

socket.on("connect", () => {
    localPlayerHandlers(socket);
    remotePlayerHandlers(socket);
    mapLoadHandlers(socket);
});