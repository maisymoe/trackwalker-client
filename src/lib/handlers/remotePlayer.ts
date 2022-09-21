import { Socket } from "socket.io-client";
import loadEntity from "../loadEntity";
import logger from "../logger";

export const playerEntities = new Map<string, ig.Entity>();

export default function(socket: Socket) {
    socket.on("playerJoin", async (player: Player) => { 
        logger.log(`${player.username} (${player.id}) joined`);

        // @ts-expect-error
        if (!ig.game.mapName) return;

        await loadEntity();

        // TODO: Spawn at real positions
        const entity = ig.game.spawnEntity("Enemy", 0, 0, 0, {
            name: player.username,
            enemyInfo: {
                type: "multiplayer",
                group: "",
                party: "PLAYER",
            },
            mapId: 233,
            skipHook: true,
        });

        // @ts-expect-error
        entity.proxies = ig.game.playerEntity.proxies;

        playerEntities.set(player.id, entity);
    });
    socket.on("playerLeave", (player: Player) => logger.log(`${player.username} (${player.id}) left`));
    socket.on("playerUpdate", (player: Player, pos: Position) => { 
        logger.log(`Player position update for ${player.username} (${player.id})\nroom: ${pos.roomName}\nx: ${pos.x}\ny: ${pos.y}\nz: ${pos.z}`);
        
        const entity = playerEntities.get(player.id);
        entity?.setPos(pos.x, pos.y, pos.z);
    });
}