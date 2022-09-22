import { Socket } from "socket.io-client";

export default function(socket: Socket) {
    ig.input.bind(ig.KEY.F4, "trackwalkerReload");

    const orig = ig.game.update;
    ig.game.update = () => {
        const result = orig.call(ig.game);
        if (ig.input.pressed("trackwalkerReload")) socket.emit("requestPlayers");
        return result;
    };
}