import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { SetMonster } from '../state/monster.actions';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store, private toastrService: ToastrService) {}

  createNewMonster(model:any){
    return this.http.post<{token: string}>(this.baseUrl + '/monster/create', model).subscribe(response => {
      console.log(model)
      console.log(response)
    })
  }

  getMonster(enemyName: string) {
    this.http.post<{ message: string; monster: any }>(this.baseUrl + '/monster/' + enemyName, enemyName)
    .pipe(
      catchError((err) => {

        this.toastrService.error(
          'Oops! Something went wrong. Please try to refresh and let us know if the problem persists.',
          'Error'
        );
        return throwError(() => err);
      }),
      take(1)
      ).subscribe(MonsterData => {
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

