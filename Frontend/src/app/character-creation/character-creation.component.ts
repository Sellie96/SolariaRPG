import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { UserState } from '../state/user.state';
import { Character } from '../_modules/Character';
import { CharacterService } from '../_Services/character.service';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css'],
})
export class CharacterCreationComponent implements OnInit, OnDestroy {
  characters: Character[];
  character: Character;
  user$: Observable<any> = this.store.select(UserState);
  characterNameForm: FormGroup;

  newCharacter: boolean = false;

  constructor(
    private characterService: CharacterService,
    private store: Store,
    private fb: FormBuilder
  ) {}
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.loadCharacter();
    this.characterNameForm = this.fb.group({
      characterName: ['', Validators.required],
    });
  }

  onDelete(characterId: string) {
    this.characterService.killCharacter(characterId);
    console.log(characterId);
    this.loadCharacter();
  }

  createCharacter() {
    this.characterService.createNewCharacter(this.characterNameForm.value);
    this.loadCharacter();
    this.newCharacter = false;
  }

  async loadCharacter() {
    this.characterService.getCharacters().pipe(
      catchError((err) => {
        return throwError(() => err);
      }),
      take(1)
    ).subscribe((characters: Character[]) => {
      this.characters = characters;
    });
  }

  async selectCharacter(
    character: Character
  ) {
    this.characterService.saveCharacter(character);
    window.location.href = "/battle"
  }
}
