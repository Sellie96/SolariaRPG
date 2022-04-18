import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MonsterState, MonsterStateModel } from 'src/app/state/monster.state';
import { MonsterService } from 'src/app/_Services/monster.service';

@Component({
  selector: 'app-monster-select',
  templateUrl: './monster-select.component.html',
  styleUrls: ['./monster-select.component.css']
})
export class MonsterSelectComponent implements OnInit {

  showCombatAreas: boolean;
  showGoblin: boolean;
  showDesolate: boolean;
  showFrozen: boolean;
  showThorny: boolean;
  showFiery: boolean;
  showTower: boolean;

  @Output() monsterSelected = new EventEmitter<any>();

  monster: any;

  @Select(MonsterState) monster$: Observable<MonsterStateModel>;

  constructor(private monsterService: MonsterService) { }

  ngOnInit(): void {
  }

  toggleCombatAreas() {
    if(this.showCombatAreas) {
      this.showCombatAreas = false;
    } else {
      this.showCombatAreas = true;
    }
  }

  toggleGoblin() {
    if(this.showGoblin) {
      this.showGoblin = false;
    } else {
      this.showGoblin = true;
    }
  }

  toggleDesolate() {
    if(this.showDesolate) {
      this.showDesolate = false;
    } else {
      this.showDesolate = true;
    }
  }

  toggleFrozen() {
    if(this.showFrozen) {
      this.showFrozen = false;
    } else {
      this.showFrozen = true;
    }
  }


  toggleThorny() {
    if(this.showThorny) {
      this.showThorny = false;
    } else {
      this.showThorny = true;
    }
  }

  toggleFiery() {
    if(this.showFiery) {
      this.showFiery = false;
    } else {
      this.showFiery = true;
    }
  }

  toggleTower() {
    if(this.showTower) {
      this.showTower = false;
    } else {
      this.showTower = true;
    }
  }

  fightMonster(monsterName) {
      this.monsterSelected.emit(monsterName);
      this.monsterService.getMonster(monsterName);
      this.monster$.subscribe((monster) => {
        this.monster = {
          name: monster.name,
          level: monster.level,
          hp: monster.hpCurrent,
          hpMax: monster.hpMax,
          damage: monster.damage,
          accuracy: monster.accuracy,
          armour: monster.armour,
          evasion: monster.evasion,
          xp: monster.xp,
          gold: monster.gold,
        };
      });
  }



}
