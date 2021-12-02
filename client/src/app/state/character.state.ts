import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { SetCharacter } from "./character.actions";

export interface CharacterStateModel {
    hp: number,
    hpmax: number,
    xp: number,
    xpmax: number,
    damage: number,
    accuracy: number,
    armour: number,
    evasion: number,
    critchance: number
}

@State<CharacterStateModel>({
    name: 'character',
    defaults: {
        hp: 1,
        hpmax: 1,
        xp: 0,
        xpmax: 1,
        damage: 0,
        accuracy: 0,
        armour: 0,
        evasion: 0,
        critchance: 1
    }
})

@Injectable()
export class CharacterState {
    @Action(SetCharacter)
    setCharacter({patchState}: StateContext<CharacterStateModel>,
         {payload, payload2, payload3, payload4, payload5, payload6, payload7, payload8, payload9}: SetCharacter) {
        patchState({
            hp: payload,
            hpmax: payload2,
            xp: payload3,
            xpmax: payload4,
            damage: payload5,
            accuracy: payload6,
            armour: payload7,
            evasion: payload8,
            critchance: payload9
        })
    }
}

