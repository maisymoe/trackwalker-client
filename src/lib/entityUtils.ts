import { Socket } from "socket.io-client";

export const playerEntities = new Map<string, ig.Entity>();

export const loadEntity = async(): Promise<void> => new Promise((resolve) => new sc.EnemyType("multiplayer").load(() => resolve()));

export async function spawnPlayerEntity(player: Player) {
    // @ts-expect-error
    if (!ig.game.mapName || ig.game.entities.length <= 0) return;

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
}

export async function destroyPlayerEntity(player: Player) {
    const entity = playerEntities.get(player.id);

    if (entity) {
        entity.kill();
        playerEntities.delete(player.id);
    }
}

export async function spawnEntities(socket: Socket, players: Player[]) {
    const filteredPlayers = players.filter(p => p.id !== socket.id);
    playerEntities.clear();

    for (let player of filteredPlayers) {
        await spawnPlayerEntity(player);
    };
}