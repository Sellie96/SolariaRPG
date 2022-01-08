import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { SetMonster } from '../state/monster.actions';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  createNewMonster(model:any){
    return this.http.post<{token: string}>(this.baseUrl + '/monster/create', model).subscribe(response => {
      console.log(model)
      console.log(response)
    })
  }

  getMonster(enemyName: string) {
    this.http.post<{ message: string; monster: any }>(this.baseUrl + '/monster/' + enemyName, enemyName).subscribe(MonsterData => {
      this.store.dispatch(new SetMonster(
        MonsterData.monster.name,
        MonsterData.monster.level,
        MonsterData.monster.hpCurrent,
        MonsterData.monster.hpMax,
        MonsterData.monster.damage,
        MonsterData.monster.accuracy,
        MonsterData.monster.armour,
        MonsterData.monster.evasion,
        MonsterData.monster.critChance,
        MonsterData.monster.xp,
        MonsterData.monster.gold));
    })
  }
}

