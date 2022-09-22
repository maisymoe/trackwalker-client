import connect from "./lib/connect";
import localPlayerHandlers from "./lib/handlers/localPlayer";
import remotePlayerHandlers from "./lib/handlers/remotePlayer";
import mapLoadHandlers from "./lib/handlers/mapLoad";
import keybindHandlers from "./lib/handlers/keybind";

// TODO: Move connection to a button on TitleScreenGui
const socket = connect();

localPlayerHandlers(socket);
remotePlayerHandlers(socket);
mapLoadHandlers(socket);
keybindHandlers(socket);