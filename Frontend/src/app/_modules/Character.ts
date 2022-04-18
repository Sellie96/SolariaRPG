export interface Character {
    _id: string;
    userId: string;
    characterName: string;
    accuracy: number;
    armour: number;
    backpack: any;
    equipment: any[];
    potions: any;
    level: number;
    hpMax: number;
    hpCurrent: number;
    xpMax: number;
    xpCurrent: number;
    damage: number;
    evasion: number;
    critChance: number;
    gold: number;
}
