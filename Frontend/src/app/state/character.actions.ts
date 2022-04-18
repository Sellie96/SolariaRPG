import { Character } from "../_modules/Character";

export class SetCharacter {
    static readonly type = '[character] set character';
    constructor(public payload: Character) {}
}