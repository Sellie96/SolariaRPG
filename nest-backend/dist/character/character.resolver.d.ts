import { CharacterService } from './character.service';
export declare class CharacterResolver {
    private characterService;
    constructor(characterService: CharacterService);
    character(id: string): Promise<import("./character.entity").Character>;
    createCharacter(level: Number, hpMax: Number, hpCurrent: Number, xpMax: Number, xpCurrent: Number, damage: Number, accuracy: Number, armour: Number, evasion: Number, critChance: Number, gold: Number): Promise<import("./character.entity").Character>;
}
