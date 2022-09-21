export default async function(): Promise<void> {
    return new Promise((resolve) => new sc.EnemyType("multiplayer").load(() => resolve()));
}