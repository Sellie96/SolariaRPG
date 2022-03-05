import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { ToastrService } from 'ngx-toastr';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { CharacterState, CharacterStateModel } from '../state/character.state';
import { MonsterState, MonsterStateModel } from '../state/monster.state';
import { CharacterService } from '../_Services/character.service';
import { ItemService } from '../_Services/item.service';
import { MonsterService } from '../_Services/monster.service';

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
  playerBonus: any;
  monster: any;
  currentMonster: any;
  playerDamage: string;
  monsterDamage: string;
  holdItem: any;

  value: number = 0;
  sub;

  fighting: boolean = false;

  @Select(CharacterState) character$: Observable<CharacterStateModel>;
  @Select(MonsterState) monster$: Observable<MonsterStateModel>;
  key: string;

  constructor(
    private memberService: CharacterService,
    private characterService: CharacterService,
    private itemService: ItemService,
    private router: Router,
    private monsterService: MonsterService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCharacter();
    this.progressLoop();
    this.fighting = true;
    this.loadMonster(this.currentMonster || "Goblin");
    this.gameLoop();
    this.calculateEquipmentStats();
  }

  gameLoop() {
    setInterval(async () => {
      if (this.fighting) {
        this.progressLoop();
        this.playerAttack();
        if (this.monster.hp <= 0) {
          this.monster.hp = 0;
          await this.delay(1000);
          this.monsterDied();
          this.saveAll();
        } else {
          this.monsterAttack();
        }

        if (this.player.hp <= 0) {
          this.player.hp = 0;
          await this.delay(1000);
          this.playerDied();
        }

        this.value = 0;
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
          this.player.gold,
          this.player.potions,
          this.player.equipment,
          this.player.backpack,
          this.player.id
        );
      }
    }, 5000);
  }

  async playerDied() {
    this.memberService.killCharacter(this.player.id);
    this.router.navigate(['/character-select']);
    await this.delay(1000);
    location.reload();
    this.toastr.error("Oh dear you've died");
  }

  calculateRandomDropChances = chanceInPercentage => {
    return chanceInPercentage > Math.random() * 100;
  };

  async monsterDied() {
    this.player.xp += this.monster.xp + 50;
    this.player.gold += this.monster.gold;

    let dropItem = this.calculateRandomDropChances(100);

    if(dropItem) {
      this.dropItem();
    }

    let tinyPotions = this.player.potions.tinyPotion + 1;
    this.player.potions = { tinyPotion: tinyPotions };
    if (this.player.xp >= this.player.xpMax) {
      this.levelUp();
    }
    this.toastr.success(
      'You gained: ' + this.monster.xp + ' XP, ' + this.monster.gold + ' Gold!',
      this.monster.name + ' was killed!'
    );
    this.loadMonster(this.currentMonster);
    await this.delay(1000);
  }

  dropItem() {
    let test = Object.assign([], this.player.backpack);

    let holder = this.itemService.getDrop(this.monster.name);

    if (test.length < 30) {
    test.push(holder);
    this.toastr.info("You gained 1x " + holder.name)
    this.player.backpack = test;
    } else this.toastr.warning("Backpack Full")
  }

  progressLoop() {
    this.value = 0;
    this.sub && this.sub.unsubscribe();
    this.sub = this.interval(5000).subscribe((res) => {
      this.value = res;
    });
  }

  playerAttack() {
    let chanceToHit = this.calculatePlayerChanceToHit();
    if (this.calculateRandomChance(chanceToHit)) {
      let dmg: number = 0;
      dmg = (this.player.damage + this.playerBonus.damage) - this.monster.armour / 4;
      dmg.toFixed(0);
      if (dmg < 0) {
        dmg = 0;
      }
      if (dmg > this.monster.hpCurrent) {
        dmg = this.monster.hpCurrent;
      }
      this.displayPlayerDamage(dmg);
      this.monster.hp -= dmg;
    } else this.displayPlayerDamage('Missed')
  }

  displayPlayerDamage(dmg) {
    if(dmg === "Missed") {
      this.playerDamage = dmg;
    } else this.playerDamage = "- " + dmg;
  }

  displayMonsterDamage(dmg) {
    if(dmg === "Missed") {
      this.monsterDamage = dmg;
    } else this.monsterDamage = "- " + dmg;
  }

  monsterAttack() {
    let chanceToHit = this.calculateMonsterChancetoHit();
    if (this.calculateRandomChance(chanceToHit)) {
      let dmg: number = 0;
      dmg = this.monster.damage - (this.player.armour + this.playerBonus.armour) / 4;
      dmg.toFixed(0);
      if (dmg < 0) {
        dmg = 0;
      }
      if (dmg > this.player.hp) {
        dmg = this.player.hp;
      }
      this.displayMonsterDamage(dmg);
      this.player.hp -= dmg;
    } else this.displayMonsterDamage("Missed");
  }

  calculatePlayerChanceToHit() {
    let chanceToHit = 0;
    if (this.monster.evasion < (this.player.accuracy + this.playerBonus.accuracy)) {
      chanceToHit =
        (1 - 0.5 * (this.monster.evasion / (this.player.accuracy + this.playerBonus.accuracy))) * 100;
    } else {
      chanceToHit = 0.5 * ((this.player.accuracy + this.playerBonus.accuracy) / this.monster.evasion) * 100;
    }
    return chanceToHit.toFixed(2);
  }

  calculateMonsterChancetoHit() {
    let chanceToHit = 0;
    if (this.player.evasion + this.playerBonus.evasion < this.monster.accuracy) {
      chanceToHit =
        (1 - 0.5 * ((this.player.evasion + this.playerBonus.evasion) / this.monster.accuracy)) * 100;
    } else {
      chanceToHit = 0.5 * (this.monster.accuracy / (this.player.evasion + this.playerBonus.evasion)) * 100;
    }
    return chanceToHit.toFixed(2);
  }

  levelUp() {
    this.player.level++;
    this.player.xpMax += 25 * this.player.level;
    this.player.hpMax += 10;
    this.player.hp = this.player.hpMax + this.playerBonus.hpMax;
    this.player.damage += 1;
    this.player.accuracy += 5;
    this.player.xp = 0;
    this.toastr.success('You have reached level ' + this.player.level);
  }

  playerHeal() {
    if (
      this.player.potions.tinyPotion > 0 &&
      this.player.hp < this.player.hpMax + this.playerBonus.hpMax
    ) {
      this.player.hp += 10;
      let tinyPotions = this.player.potions.tinyPotion - 1;
      this.player.potions = { tinyPotion: tinyPotions };
    }
  }

  togglePause() {
    if (this.fighting) {
      this.fighting = false;
    } else this.fighting = true;
  }

  async saveAll() {
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
      this.player.gold,
      this.player.potions,
      this.player.equipment,
      this.player.backpack,
      this.player.id
    );
  }

  async loadCharacter() {
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
        gold: character.gold,
        potions: character.potions,
        equipment: character.equipment,
        backpack: character.backpack,
        id: character.characterId,
      };
    });
  }

  calculateEquipmentStats() {
    let dmg = 0;
    let armour = 0;
    let evasion = 0;
    let hpMax = 0;
    let accuracy = 0;

    this.playerBonus = {
      damage: this.calculateDamage(dmg),
      armour: this.calculateArmour(armour),
      evasion: this.calculateEvasion(evasion),
      hpMax: this.calculateHp(hpMax),
      accuracy: this.calculateAccuracy(accuracy)
    }
  }

  calculateDamage(dmg) {
    if(this.player.equipment[0].damage) {
      dmg += this.player.equipment[0].damage
    }
    if(this.player.equipment[1].damage) {
      dmg += this.player.equipment[1].damage
    }
    if(this.player.equipment[2].damage) {
      dmg += this.player.equipment[2].damage
    }
    if(this.player.equipment[3].damage) {
      dmg += this.player.equipment[3].damage
    }
    if(this.player.equipment[4].damage) {
      dmg += this.player.equipment[4].damage
    }
    if(this.player.equipment[5].damage) {
      dmg += this.player.equipment[5].damage
    }
    if(this.player.equipment[6].damage) {
      dmg += this.player.equipment[6].damage
    }
    if(this.player.equipment[8].damage) {
      dmg += this.player.equipment[8].damage
    }
    if(this.player.equipment[7].damage) {
      dmg += this.player.equipment[7].damage
    }
    if(this.player.equipment[9].damage) {
      dmg += this.player.equipment[9].damage
    }
    return dmg;
  }

  calculateArmour(armour) {
    if(this.player.equipment[0].armour) {
      armour += this.player.equipment[0].armour
    }
    if(this.player.equipment[1].armour) {
      armour += this.player.equipment[1].armour
    }
    if(this.player.equipment[2].armour) {
      armour += this.player.equipment[2].armour
    }
    if(this.player.equipment[3].armour) {
      armour += this.player.equipment[3].armour
    }
    if(this.player.equipment[4].armour) {
      armour += this.player.equipment[4].armour
    }
    if(this.player.equipment[5].armour) {
      armour += this.player.equipment[5].armour
    }
    if(this.player.equipment[6].armour) {
      armour += this.player.equipment[6].armour
    }
    if(this.player.equipment[8].armour) {
      armour += this.player.equipment[8].armour
    }
    if(this.player.equipment[7].armour) {
      armour += this.player.equipment[7].armour
    }
    if(this.player.equipment[9].armour) {
      armour += this.player.equipment[9].armour
    }
    return armour;
  }

  calculateEvasion(evasion) {
    if(this.player.equipment[0].evasion) {
      evasion += this.player.equipment[0].evasion
    }
    if(this.player.equipment[1].evasion) {
      evasion += this.player.equipment[1].evasion
    }
    if(this.player.equipment[2].evasion) {
      evasion += this.player.equipment[2].evasion
    }
    if(this.player.equipment[3].evasion) {
      evasion += this.player.equipment[3].evasion
    }
    if(this.player.equipment[4].evasion) {
      evasion += this.player.equipment[4].evasion
    }
    if(this.player.equipment[5].evasion) {
      evasion += this.player.equipment[5].evasion
    }
    if(this.player.equipment[6].evasion) {
      evasion += this.player.equipment[6].evasion
    }
    if(this.player.equipment[8].evasion) {
      evasion += this.player.equipment[8].evasion
    }
    if(this.player.equipment[7].evasion) {
      evasion += this.player.equipment[7].evasion
    }
    if(this.player.equipment[9].evasion) {
      evasion += this.player.equipment[9].evasion
    }
    return evasion;
  }

  calculateHp(hpMax) {
    if(this.player.equipment[0].hpMax) {
      hpMax += this.player.equipment[0].hpMax
    }
    if(this.player.equipment[1].hpMax) {
      hpMax += this.player.equipment[1].hpMax
    }
    if(this.player.equipment[2].hpMax) {
      hpMax += this.player.equipment[2].hpMax
    }
    if(this.player.equipment[3].hpMax) {
      hpMax += this.player.equipment[3].hpMax
    }
    if(this.player.equipment[4].hpMax) {
      hpMax += this.player.equipment[4].hpMax
    }
    if(this.player.equipment[5].hpMax) {
      hpMax += this.player.equipment[5].hpMax
    }
    if(this.player.equipment[6].hpMax) {
      hpMax += this.player.equipment[6].hpMax
    }
    if(this.player.equipment[8].hpMax) {
      hpMax += this.player.equipment[8].hpMax
    }
    if(this.player.equipment[7].hpMax) {
      hpMax += this.player.equipment[7].hpMax
    }
    if(this.player.equipment[9].hpMax) {
      hpMax += this.player.equipment[9].hpMax
    }
    return hpMax;
  }

  calculateAccuracy(accuracy) {
    if(this.player.equipment[0].accuracy) {
      accuracy += this.player.equipment[0].accuracy
    }
    if(this.player.equipment[1].accuracy) {
      accuracy += this.player.equipment[1].accuracy
    }
    if(this.player.equipment[2].accuracy) {
      accuracy += this.player.equipment[2].accuracy
    }
    if(this.player.equipment[3].accuracy) {
      accuracy += this.player.equipment[3].accuracy
    }
    if(this.player.equipment[4].accuracy) {
      accuracy += this.player.equipment[4].accuracy
    }
    if(this.player.equipment[5].accuracy) {
      accuracy += this.player.equipment[5].accuracy
    }
    if(this.player.equipment[6].accuracy) {
      accuracy += this.player.equipment[6].accuracy
    }
    if(this.player.equipment[8].accuracy) {
      accuracy += this.player.equipment[8].accuracy
    }
    if(this.player.equipment[7].accuracy) {
      accuracy += this.player.equipment[7].accuracy
    }
    if(this.player.equipment[9].accuracy) {
      accuracy += this.player.equipment[9].accuracy
    }
    return accuracy;
  }

  async loadMonster(monsterName) {
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

  changeMonster(monster) {
    this.currentMonster = monster;
  };

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (event.key === 'h' || event.key === 'H') {
      this.playerHeal();
    }

    if (event.key === 'p' || event.key === 'P') {
      this.togglePause();
    }
  }

  interval(timeToWait) {
    const initial = new Date().getTime();
    return timer(0, 800).pipe(
      map(() => new Date().getTime()),
      takeWhile((res) => res <= initial + timeToWait, true),
      map((now) => {
        this.calculateEquipmentStats();
        const porc = (1000 * (now - initial)) / timeToWait;
        return porc < 1000 ? Math.round(porc) : 100;
      })
    );
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  calculateRandomChance(chanceInPercentage) {
    return chanceInPercentage > Math.random() * 100;
  }
}
