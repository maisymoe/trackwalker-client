import { Socket } from "socket.io-client";
import spawnPlayerEntity, { playerEntities } from "../spawnPlayerEntity";

export default function(socket: Socket) {
    const orig = ig.game.loadLevel;
    ig.game.loadLevel = (data: any) => {
        const result = orig.call(ig.game, data);
        socket.emit("requestPlayers");
        return result;
    };

    socket.on("recievePlayers", async (players: Player[]) => {
        const filteredPlayers = players.filter(p => p.id !== socket.id);
        playerEntities.clear();

        for (let player of filteredPlayers) {
            await spawnPlayerEntity(player);
        };
    });
};