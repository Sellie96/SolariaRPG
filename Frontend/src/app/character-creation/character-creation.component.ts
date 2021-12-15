import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
import { SetCharacter } from '../state/character.actions';
import { UserState } from '../state/user.state';
import { Character } from '../_modules/Character';
import { CharacterService } from '../_Services/character.service';
import { SharedService } from '../_Services/shared.service';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css'],
})
export class CharacterCreationComponent implements OnInit, OnDestroy {
  characters: any[];
  character: Character;
  user$: Observable<any> = this.store.select(UserState);

  constructor(
    private characterService: CharacterService,
    private store: Store,
    private router: Router,
    private sharedService: SharedService
  ) {}
  ngOnDestroy(): void {
    this.characters = [];
  }

  ngOnInit(): void {
    this.loadCharacter();
  }

  onDelete(characterId: string) {
    this.characterService.killCharacter(characterId);
    location.reload();
  }

  createCharacter() {
    this.characterService.createNewCharacter();
    location.reload();
  }

  async loadCharacter() {
    this.characters = this.characterService.getCharacters();
  }

  async selectCharacter(
    level: number,
    hpCurrent: number,
    hpMax: number,
    xpCurrent: number,
    xpMax: number,
    damage: number,
    accuracy: number,
    armour: number,
    evasion: number,
    critChance: number,
    characterId: string
  ) {
    this.characterService.saveCharacter(
      level,
      hpCurrent,
      hpMax,
      xpCurrent,
      xpMax,
      damage,
      accuracy,
      armour,
      evasion,
      critChance,
      characterId
    );
    window.location.href = "/town"
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
