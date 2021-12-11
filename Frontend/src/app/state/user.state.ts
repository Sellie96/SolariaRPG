import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { SetUser } from "./user.actions";

export interface UserStateModel {
    userId: string
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        userId: ""
    }
})

@Injectable()
export class UserState {
    @Action(SetUser)
    SetUser({patchState}: StateContext<UserStateModel>,
         {payload}: SetUser) {
        patchState({
            userId: payload
        })
    }
}

