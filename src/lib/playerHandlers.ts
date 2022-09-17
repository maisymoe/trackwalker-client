import { Socket } from "socket.io-client";

export default function(socket: Socket) {
    ig.ENTITY.Player.inject({
        update() {
            this.parent();
            // @ts-expect-error
            if (this.coll.vel.x !== 0 || this.coll.vel.y !== 0) {
                socket.emit("updatePosition", {
                    ...this.coll.pos,
                    // @ts-expect-error
                    roomName: ig.game.mapName,
                });
            }
        },
    });
}