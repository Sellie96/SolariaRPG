import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SetCharacter } from '../state/character.actions';
import { Character } from '../_modules/Character';
import { Member } from '../_modules/member';
import { Monster } from '../_modules/Monster';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  monster: Monster[] = [];
  character: Character[] = [];

  constructor(private http: HttpClient, private store: Store) {}

  getCharacters() {
    this.http
      .get<{ message: string; character: any }>(
        this.baseUrl + '/character'
      )
      .pipe(map((characterData) => {
        return characterData.character.map(characters => {
          return {
            level: characters.level,
            hpMax: characters.hpMax,
            hpCurrent: characters.hpCurrent,
            xpMax: characters.xpMax,
            xpCurrent: characters.xpCurrent,
            damage: characters.damage,
            accuracy: characters.accuracy,
            armour: characters.armour,
            evasion: characters.evasion,
            critChance: characters.critChance,
            gold: characters.gold,
            potions: characters.potions,
            equipment: characters.equipment,
            backpack: characters.backpack,
            id: characters._id,
            userId: characters.userId
          }
        })
      }))
      .subscribe((transformedCharacters) => {
        this.character.push(transformedCharacters)
      });
      return this.character;
  }

  createNewCharacter() {
    this.http.post<{message:string, characterId: string}>(this.baseUrl + '/character', "").subscribe(responseData =>{
      console.log(responseData.message);
    })
  }

  killCharacter(characterId: string){
    this.http.delete(this.baseUrl + '/character/' + characterId)
    .subscribe(() => {
      console.log("Deleted!")
    })
  }

  updateCharacter(level, hpCurrent, hpMax, xpCurrent, xpMax, damage, accuracy, armour, evasion, critChance, gold, potions, equipment, backpack, id) {
    const character: any = {level, hpCurrent, hpMax, xpCurrent, xpMax, damage, accuracy, armour, evasion, critChance, gold, potions, equipment, backpack, id}
    this.http.put<{message:string, characterId: string}>(this.baseUrl + '/character/update/' + id, character )
    .subscribe(responseData =>{
      console.log(responseData);
    })
  }

  saveCharacter(level, hp, hpMax, xp, xpMax, damage, accuracy, armour, evasion, critChance, gold, potions, equipment, backpack, id) {
    this.store.dispatch(new SetCharacter(
      level,
      hp,
      hpMax,
      xp,
      xpMax,
      damage,
      accuracy,
      armour,
      evasion,
      critChance,
      gold,
      potions,
      equipment,
      backpack,
      id
    ));
  }

}

