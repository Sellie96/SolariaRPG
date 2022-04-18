import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Character } from '../_modules/Character';
import { SetCharacter } from './character.actions';

export interface CharacterStateModel {
  character: Character;
}

@State<CharacterStateModel>({
  name: 'character',
})
@Injectable()
export class CharacterState {
  @Selector()
  static selectCharacterStats(state: CharacterStateModel) {
    return state.character;
  }

  @Action(SetCharacter)
  setCharacter(
    { setState, getState }: StateContext<CharacterStateModel>,
    { payload }: SetCharacter
  ) {
    setState({
      ...getState(),
      character: payload,
    });
  }
}
