import loadEntity from "./loadEntity";

export const playerEntities = new Map<string, ig.Entity>();

export default async function(player: Player) {
    // @ts-expect-error
    if (!ig.game.mapName || ig.game.entities <= 0) return;

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