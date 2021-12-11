import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Character } from '../_modules/Character';
import { Member } from '../_modules/member';
import { Monster } from '../_modules/Monster';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createNewMonster(model:any){
    return this.http.post<{token: string}>(this.baseUrl + '/monster/create', model).subscribe(response => {
      console.log(model)
      console.log(response)
    })
  }

  getMonster(enemyName: string) {
    this.http.get<{ message: string; monster: any }>(this.baseUrl + '/monster/' + enemyName).subscribe(CharacterData => {
      console.log(CharacterData)
    })
  }
}

