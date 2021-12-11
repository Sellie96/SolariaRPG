import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { SetCharacter } from "./character.actions";
import { SetMonster } from "./monster.actions";

export interface MonsterStateModel {
    name: string
    level: number,
    hp: number,
    hpmax: number,
    damage: number,
    attack: number,
    armour: number,
    evasion: number,
    critchance: number,
    xp: number,
    gold: number,
}

@State<MonsterStateModel>({
    name: 'monster'
})

@Injectable()
export class MonsterState {
    @Action(SetMonster)
    setCharacter({patchState}: StateContext<MonsterStateModel>,
         {payload, payload2, payload3, payload4, payload5, payload6, payload7, payload8, payload9, payload10}: SetMonster) {
        patchState({
            name: payload,
            level:payload2,
            hp: payload2,
            hpmax: payload3,
            damage: payload4,
            attack: payload5,
            armour: payload6,
            evasion: payload7,
            critchance: payload8,
            xp: payload9,
            gold: payload10
        })
    }
}

