import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { SetCharacter } from "./character.actions";

export interface CharacterStateModel {
    level: number,
    hp: number,
    hpmax: number,
    xp: number,
    xpmax: number,
    damage: number,
    accuracy: number,
    armour: number,
    evasion: number,
    critchance: number,
    characterId: string
}

@State<CharacterStateModel>({
    name: 'character'
})

@Injectable()
export class CharacterState {
    @Action(SetCharacter)
    setCharacter({patchState}: StateContext<CharacterStateModel>,
         {payload, payload2, payload3, payload4, payload5, payload6, payload7, payload8, payload9, payload10, payload11}: SetCharacter) {
        patchState({
            level:payload,
            hp: payload2,
            hpmax: payload3,
            xp: payload4,
            xpmax: payload5,
            damage: payload6,
            accuracy: payload7,
            armour: payload8,
            evasion: payload9,
            critchance: payload10,
            characterId: payload11
        })
    }
}

