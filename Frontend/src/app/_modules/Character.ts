export interface Character {
    id: number;
    level: number;
    hpMax: number;
    hpCurrent: number;
    xpMax: number;
    xpCurrent: number;
    damage: number;
    accuracy: number;
    armour: number;
    evasion: number;
    critChance: number;
    userId: string;
}
