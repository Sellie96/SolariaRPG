import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SetCharacter } from '../state/character.actions';
import { Character } from '../_modules/Character';
import { Member } from '../_modules/member';
import { Monster } from '../_modules/Monster';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  monster: Monster[] = [];
  character: Character[] = [];

  constructor(private http: HttpClient, private store: Store) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Array<Character>>(this.baseUrl + '/character');
  }

  createNewCharacter(characterName) {
    let body = {
      characterName: characterName.characterName
    }
    this.http
      .post<{ message: string; characterId: string }>(
        this.baseUrl + '/character',
        body
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }

  killCharacter(characterId: string) {
    this.http
      .delete(this.baseUrl + '/character/' + characterId)
      .subscribe(() => {
        console.log('Deleted!');
      });
  }

  updateCharacter(character) {
    this.http
      .put<{ message: string; characterId: string }>(
        this.baseUrl + '/character/update/' + character._id,
        character
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  saveCharacter(character: Character) {
    this.store.dispatch(new SetCharacter(character));
  }
}
