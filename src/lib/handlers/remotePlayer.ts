import { Socket } from "socket.io-client";
import { spawnPlayerEntity, playerEntities } from "../entityUtils";
import { log } from "../logger";

export default function(socket: Socket) {
    socket.on("playerJoin", async (player: Player) => { 
        log(`${player.username} (${player.id}) joined`);

        await spawnPlayerEntity(player);
    });
    socket.on("playerLeave", (player: Player) => { 
        log(`${player.username} (${player.id}) left`);
        const entity = playerEntities.get(player.id);

        if (entity) {
            entity?.kill();
            playerEntities.delete(player.id);
        }
    });
    socket.on("playerPositionUpdate", (player: Player, pos: Position) => { 
        // logger.log(`Player position update for ${player.username} (${player.id})\nroom: ${pos.roomName}\nx: ${pos.x}\ny: ${pos.y}\nz: ${pos.z}`);
        const entity = playerEntities.get(player.id);

        if (entity) {
            entity.setPos(pos.x, pos.y, pos.z);
        }
    });
    socket.on("playerAnimationUpdate", (player: Player, anim: string, direction: Vec2) => { 
        // logger.log(`Player animation update for ${player.username} (${player.id})\nanim: ${anim}\ndirectionX: ${direction.x}\ndirectionY: ${direction.y}`);
        const entity = playerEntities.get(player.id);

        if (entity) {
            // @ts-expect-error
            entity.face = direction;
            // @ts-expect-error
            entity.setCurrentAnim(anim);
        }
    });
}