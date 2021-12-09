import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Character } from '../_modules/Character';
import { Member } from '../_modules/member';
import { Monster } from '../_modules/Monster';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  monster: Monster[] = [];
  character: Character[] = [];

  constructor(private http: HttpClient) {}

  getCharacter() {
    this.http
      .get<{ message: string; character: any }>(
        'http://localhost:3000/character'
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
            id: characters.id
          }
        })
      }))
      .subscribe((transformedCharacters) => {
        this.character.push(transformedCharacters)
      });
      return this.character;
  }

  addCharacter(
  ) {
    this.http.post<{message:string}>('http://localhost:3000/character', "").subscribe(responseData =>{
      console.log(responseData.message);
    })
  }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map((members) => {
        this.members = this.members;
        return members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find((x) => x.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  getMonster(enemyName: string) {
    const enemy = this.monster.find((x) => x.enemyName === enemyName);
    if (enemy !== undefined) return of(enemy);
    return this.http.get<Monster>(this.baseUrl + 'Enemy/' + 'Goblin');
  }

  deleteCharacter(characterId: string){
    this.http.delete("http://localhost:3000/character/" + characterId)
    .subscribe(() => {
      console.log("Deleted!")
    })
  }
}

