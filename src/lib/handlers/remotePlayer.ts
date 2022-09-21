import { Socket } from "socket.io-client";
import logger from "../logger";

import spawnPlayerEntity, { playerEntities } from "../spawnPlayerEntity";

export default function(socket: Socket) {
    socket.on("playerJoin", async (player: Player) => { 
        logger.log(`${player.username} (${player.id}) joined`);

        await spawnPlayerEntity(player);
    });
    socket.on("playerLeave", (player: Player) => { 
        logger.log(`${player.username} (${player.id}) left`);

        const entity = playerEntities.get(player.id);
        entity?.kill();
        playerEntities.delete(player.id);
    });
    socket.on("playerUpdate", (player: Player, pos: Position) => { 
        // logger.log(`Player position update for ${player.username} (${player.id})\nroom: ${pos.roomName}\nx: ${pos.x}\ny: ${pos.y}\nz: ${pos.z}`);
        
        const entity = playerEntities.get(player.id);
        entity?.setPos(pos.x, pos.y, pos.z);
    });
}