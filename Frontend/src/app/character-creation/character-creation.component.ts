import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetCharacter } from '../state/character.actions';
import { UserState } from '../state/user.state';
import { Character } from '../_modules/Character';
import { MembersService } from '../_Services/character.service';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css']
})
export class CharacterCreationComponent implements OnInit, OnDestroy {
  characters: any[];
  character: Character;
  user$: Observable<any> = this.store.select(UserState);

  constructor(private memberService: MembersService, private store: Store, private router: Router) { }
  ngOnDestroy(): void {
    this.characters = [];
  }

  ngOnInit(): void {
    this.loadCharacter();
  }

  onDelete(characterId: string) {
    this.memberService.killCharacter(characterId);
    location.reload();
  }

  createCharacter(){
    this.memberService.createNewCharacter();
    location.reload();
  }

  async loadCharacter() {
    this.characters = this.memberService.getCharacters();
  }

  selectCharacter(
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
    characterId: string){
      this.store.dispatch(new SetCharacter(
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
        characterId));
        this.router.navigate(['/town']);
  }

}
