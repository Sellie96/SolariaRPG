import { Repository } from 'typeorm';
import { Character } from './character.entity';
export declare class CharacterService {
    private characterRepository;
    constructor(characterRepository: Repository<Character>);
    getCharacter(id: string): Promise<Character>;
    createCharacter(level: Number, hpMax: Number, hpCurrent: Number, xpMax: Number, xpCurrent: Number, damage: Number, accuracy: Number, armour: Number, evasion: Number, critChance: Number, gold: Number): Promise<Character>;
}
