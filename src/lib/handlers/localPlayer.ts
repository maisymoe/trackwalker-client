import { Socket } from "socket.io-client";

export default function(socket: Socket) {
    let lastAnimation: string = "idle";
    let lastDirection: Vec2 = { x: 0, y: 0 };

    ig.ENTITY.Player.inject({
        update() {
            this.parent();

            if (this.currentAnim !== lastAnimation || this.face !== lastDirection) {
                socket.emit("animationUpdate", this.currentAnim, this.face);

                lastAnimation = this.currentAnim;
                lastDirection = this.face;
            }

            // @ts-expect-error
            if (this.coll.vel.x !== 0 || this.coll.vel.y !== 0) {
                socket.emit("positionUpdate", {
                    ...this.coll.pos,
                    // @ts-expect-error
                    roomName: ig.game.mapName,
                });
            }
        },
    });
}