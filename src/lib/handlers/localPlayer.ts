import { Socket } from "socket.io-client";

export default function(socket: Socket) {
    let lastZ = 0;

    ig.ENTITY.Player.inject({
        update() {
            this.parent();
            // TODO: Reduce the update count - check whether anim or direction is different to last
            // This should also maintain the diagonal direction
            socket.emit("animationUpdate", this.currentAnim, this.face);

            // @ts-expect-error
            if (this.coll.vel.x !== 0 || this.coll.vel.y !== 0 || this.coll.pos.z !== lastZ) {
                socket.emit("positionUpdate", {
                    ...this.coll.pos,
                    // @ts-expect-error
                    roomName: ig.game.mapName,
                });

                lastZ = this.coll.pos.z;
            }
        },
    });
}