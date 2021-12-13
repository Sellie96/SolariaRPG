import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../_Services/character.service';
import { Observable, timer } from 'rxjs';
import { CharacterState, CharacterStateModel } from '../state/character.state';
import { Select, Store } from '@ngxs/store';
import { MonsterService } from '../_Services/monster.service';
import { MonsterState, MonsterStateModel } from '../state/monster.state';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { map, takeWhile } from 'rxjs/operators';
import { SetCharacter } from '../state/character.actions';
import { AccountService } from '../_Services/account.service';

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), {
    animate: true,
    value: 'dynamic',
  });
}

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }],
})
export class BattleComponent implements OnInit {
  player: any;
  monster: any;

  value: number = 0;
  sub;

  fighting: boolean = false;

  @Select(CharacterState) character$: Observable<CharacterStateModel>;
  @Select(MonsterState) monster$: Observable<MonsterStateModel>;

  constructor(
    private memberService: CharacterService,
    private characterService: CharacterService,
    private router: Router,
    private monsterService: MonsterService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.fighting = this.accountService.isBattling()
    this.loadCharacter();
    this.loadMonster();
    this.fighting = true;
    this.progressLoop();
    this.gameLoop();
  }

  loadCharacter() {
    this.character$.subscribe((character) => {
      this.player = {
        hp: character.hp,
        hpMax: character.hpmax,
        level: character.level,
        xp: character.xp,
        xpMax: character.xpmax,
        damage: character.damage,
        accuracy: character.accuracy,
        armour: character.armour,
        evasion: character.evasion,
        critChance: character.critchance,
        id: character.characterId,
      };
    });
  }

  loadMonster() {
    this.monsterService.getMonster('Goblin');
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

  async playerDied() {
    this.memberService.killCharacter(this.player.id);
    this.router.navigate(['/character-select']);
    await this.delay(1000);
    location.reload();
  }

  async monsterDied() {
    this.player.xp += this.monster.xp + 50;
    if (this.player.xp >= this.player.xpMax) {
      this.levelUp();
    }
    this.loadMonster();
    await this.delay(1000);
  }

  gameLoop() {
    if(this.fighting) {
    setInterval(async () => {
      this.progressLoop();
      this.playerAttack();
      if (this.monster.hp <= 0) {
        this.monster.hp = 0;
        await this.delay(1000);
        this.monsterDied();
        this.saveAll();
        this.loadCharacter();
      } else {
        this.monsterAttack();
      }

      if (this.player.hp <= 0) {
        this.player.hp = 0;
        await this.delay(1000);
        this.playerDied();
      }
    }, 5000);
  }
  }

  saveAll() {
    this.characterService.saveCharacter(
      this.player.level,
      this.player.hp,
      this.player.hpMax,
      this.player.xp,
      this.player.xpMax,
      this.player.damage,
      this.player.accuracy,
      this.player.armour,
      this.player.evasion,
      this.player.critChance,
      this.player.id
    );
    this.characterService.updateCharacter(
      this.player.level,
      this.player.hp,
      this.player.hpMax,
      this.player.xp,
      this.player.xpMax,
      this.player.damage,
      this.player.accuracy,
      this.player.armour,
      this.player.evasion,
      this.player.critChance,
      this.player.id
    )
    this.loadCharacter();
  }

  progressLoop() {
    setInterval(async () => {
      this.sub && this.sub.unsubscribe();
      this.sub = this.interval(5000).subscribe((res) => {
        this.value = res;
      });
    }, 5000);
  }

  playerAttack() {
    this.monster.hp -= this.player.damage + 30;
  }

  monsterAttack() {
    this.player.hp -= this.monster.damage;
  }

  levelUp() {
    this.player.level++;
    this.player.xpMax += 25 * this.player.level;
    this.player.hpMax += 10;
    this.player.hp = this.player.hpMax;
    this.player.xp = 0;
  }

  interval(timeToWait) {
    const initial = new Date().getTime();
    return timer(0, 200).pipe(
      map(() => new Date().getTime()),
      takeWhile((res) => res <= initial + timeToWait, true),
      map((now) => {
        const porc = (100 * (now - initial)) / timeToWait;
        return porc < 100 ? Math.round(porc) : 100;
      })
    );
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
