import { Socket } from "socket.io-client";
import { spawnEntities } from "../entityUtils";

export default function(socket: Socket) {
    const orig = ig.game.loadLevel;
    ig.game.loadLevel = (data: any) => {
        const result = orig.call(ig.game, data);
        socket.emit("requestPlayers");
        return result;
    };

    socket.on("recievePlayers", async (players: Player[]) => spawnEntities(socket, players));
};