import { Socket } from "socket.io-client";
import logger from "../logger";

export default function(socket: Socket) {
    socket.on("playerJoin", (player: Player) => logger.log(`${player.username} (${player.id}) joined`));
    socket.on("playerLeave", (player: Player) => logger.log(`${player.username} (${player.id}) left`));
    socket.on("playerUpdate", (player: Player, pos: Position) => logger.log(`Player position update for ${player.username} (${player.id})\nroom: ${pos.roomName}\nx: ${pos.x}\ny: ${pos.y}\nz: ${pos.z}`));
}