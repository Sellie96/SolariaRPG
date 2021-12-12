import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { SetMonster } from "./monster.actions";

export interface MonsterStateModel {
    name: string
    level: number,
    hpCurrent: number,
    hpMax: number,
    damage: number,
    accuracy: number,
    armour: number,
    evasion: number,
    critChance: number,
    xp: number,
    gold: number,
}

@State<MonsterStateModel>({
    name: 'monster'
})

@Injectable()
export class MonsterState {
    @Action(SetMonster)
    setMonster({patchState}: StateContext<MonsterStateModel>,
         {payload, payload2, payload3, payload4, payload5, payload6, payload7, payload8, payload9, payload10, payload11}: SetMonster) {
        patchState({
            name: payload,
            level:payload2,
            hpCurrent: payload3,
            hpMax: payload4,
            damage: payload5,
            accuracy: payload6,
            armour: payload7,
            evasion: payload8,
            critChance: payload9,
            xp: payload10,
            gold: payload11
        })
    }
}

