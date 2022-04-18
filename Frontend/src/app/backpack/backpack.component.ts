import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { CharacterState } from '../state/character.state';
import { Character } from '../_modules/Character';

@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.css']
})

@UntilDestroy()
export class BackpackComponent implements OnInit {

  player: Character;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.loadCharacter();
  }

  async loadCharacter() {
    this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: Character) => {

        this.player = {...character};
      });
  }

}
