import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { ToastrService } from 'ngx-toastr';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { CharacterState } from '../state/character.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MonsterState, MonsterStateModel } from '../state/monster.state';
import { Character } from '../_modules/Character';
import { CharacterService } from '../_Services/character.service';
import { ItemService } from '../_Services/item.service';
import { MonsterService } from '../_Services/monster.service';
import { Title } from '@angular/platform-browser';
import { Item } from '../_modules/item';

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), {
    animate: true,
    value: 'dynamic',
  });
}

@UntilDestroy()
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }],
})
export class BattleComponent implements OnInit {
  player: Character;
  playerBonus: any;
  monster: any;
  currentMonster: any;
  playerDamage: string;
  monsterDamage: string;
  holdItem: any;
  lootContainer: any[] = [];

  value: number = 0;
  width: number = 0;
  sub;

  fighting: boolean = true;

  @Select(CharacterState) character$: Observable<Character>;
  @Select(MonsterState) monster$: Observable<MonsterStateModel>;
  key: string;

  constructor(
    private memberService: CharacterService,
    private characterService: CharacterService,
    private itemService: ItemService,
    private router: Router,
    private monsterService: MonsterService,
    private toastr: ToastrService,
    private store: Store,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.loadCharacter();
    this.loadMonster(this.currentMonster || 'Goblin');
    this.gameLoop();
    this.calculateEquipmentStats();
  }

  gameLoop() {
    setInterval(async () => {
      untilDestroyed(this)
      this.loadCharacter();
      if (this.fighting) {
        this.playerAttack();
        if (this.monster.hp <= 0) {
          this.monster.hp = 0;
          await this.delay(1000);
          this.monsterDied();
          this.saveAll();
        } else {
          this.monsterAttack();
        }
        if (this.player.hpCurrent <= 0) {
          this.player.hpCurrent = 0;
          await this.delay(1000);
          this.playerDied();
        }
        this.titleService.setTitle(
          'Solaria Idle HP:' + this.player.hpCurrent + '/' + this.player.hpMax
        );
        this.characterService.saveCharacter(this.player);
      }
    }, 4000);
  }

  async playerDied() {
    this.memberService.killCharacter(this.player._id);
    this.router.navigate(['/character-select']);
    await this.delay(1000);
    location.reload();
    this.toastr.error("Oh dear you've died");
  }

  calculateRandomDropChances = (chanceInPercentage) => {
    return chanceInPercentage > Math.random() * 100;
  };

  async monsterDied() {
    this.player.xpCurrent += this.monster.xp + 50;
    this.player.gold += this.monster.gold;

    let dropItem = this.calculateRandomDropChances(100);

    if (dropItem) {
      this.dropItem();
    }

    let tinyPotions = this.player.potions.tinyPotion + 1;
    this.player.potions = { tinyPotion: tinyPotions };
    if (this.player.xpCurrent >= this.player.xpMax) {
      this.levelUp();
    }
    this.toastr.success(
      'You gained: ' + this.monster.xp + ' XP, ' + this.monster.gold + ' Gold!',
      this.monster.name + ' was killed!'
    );
    this.loadMonster(this.currentMonster || 'Goblin');
    await this.delay(1000);
  }

  dropItem() {
    let item: string = this.itemService.getDrop(this.monster.name);

    this.itemService.getItem(item).subscribe(ItemData => {
      let monsterDrop = ItemData.item;
      if (this.lootContainer.length < 10) {
        this.toastr.info('1x ' + monsterDrop.name + ' was dropped');
        this.lootContainer?.push(monsterDrop);
      } else this.toastr.warning('Backpack Full');
   });

  }

  collectItems() {
    let playerBackpack = Object.assign([], this.player.backpack);
    if (playerBackpack.length + this.lootContainer.length < 40) {
      playerBackpack.push(this.lootContainer);
      this.player.backpack = playerBackpack.flat();
      this.characterService.saveCharacter(this.player);
      this.lootContainer = [];
    } else this.toastr.warning('Backpack Full');
  }

  playerAttack() {
    let chanceToHit = this.calculatePlayerChanceToHit();
    if (this.calculateRandomChance(chanceToHit)) {
      let dmg: number = 0;
      dmg =
        this.player.damage + this.playerBonus.damage - this.monster.armour / 4;
      dmg.toFixed(0);
      if (dmg < 0) {
        dmg = 0;
      }
      if (dmg > this.monster.hpCurrent) {
        dmg = this.monster.hpCurrent;
      }
      this.displayPlayerDamage(dmg);
      this.monster.hp -= dmg;
    } else this.displayPlayerDamage('Missed');
  }

  displayPlayerDamage(dmg) {
    if (dmg === 'Missed') {
      this.playerDamage = dmg;
    } else this.playerDamage = '- ' + dmg;
  }

  displayMonsterDamage(dmg) {
    if (dmg === 'Missed') {
      this.monsterDamage = dmg;
    } else this.monsterDamage = '- ' + dmg;
  }

  monsterAttack() {
    let chanceToHit = this.calculateMonsterChancetoHit();
    if (this.calculateRandomChance(chanceToHit)) {
      let dmg: number = 0;
      dmg =
        this.monster.damage -
        (this.player.armour + this.playerBonus.armour) / 4;
      dmg.toFixed(0);
      if (dmg < 0) {
        dmg = 0;
      }
      if (dmg > this.player.hpCurrent) {
        dmg = this.player.hpCurrent;
      }
      this.displayMonsterDamage(dmg);
      this.player.hpCurrent -= dmg;
    } else this.displayMonsterDamage('Missed');
  }

  calculatePlayerChanceToHit() {
    let chanceToHit = 0;
    if (
      this.monster?.evasion <
      this.player.accuracy + this.playerBonus.accuracy
    ) {
      chanceToHit =
        (1 -
          0.5 *
            (this.monster?.evasion /
              (this.player.accuracy + this.playerBonus.accuracy))) *
        100;
    } else {
      chanceToHit =
        0.5 *
        ((this.player.accuracy + this.playerBonus.accuracy) /
          this.monster?.evasion) *
        100;
    }
    return chanceToHit.toFixed(2);
  }

  calculateMonsterChancetoHit() {
    let chanceToHit = 0;
    if (
      this.player.evasion + this.playerBonus.evasion <
      this.monster?.accuracy
    ) {
      chanceToHit =
        (1 -
          0.5 *
            ((this.player.evasion + this.playerBonus.evasion) /
              this.monster?.accuracy)) *
        100;
    } else {
      chanceToHit =
        0.5 *
        (this.monster?.accuracy /
          (this.player.evasion + this.playerBonus.evasion)) *
        100;
    }
    return chanceToHit.toFixed(2);
  }

  levelUp() {
    this.player.level++;
    this.player.xpMax += 25 * this.player.level;
    this.player.hpMax += 10;
    this.player.hpCurrent = this.player.hpMax + this.playerBonus.hpMax;
    this.player.damage += 1;
    this.player.accuracy += 5;
    this.player.xpCurrent = 0;
    this.toastr.success('You have reached level ' + this.player.level);
  }

  playerHeal() {
    if (
      this.player.potions.tinyPotion > 0 &&
      this.player.hpCurrent < this.player.hpMax + this.playerBonus.hpMax
    ) {
      this.player.hpCurrent += 10;
      let tinyPotions = this.player.potions.tinyPotion - 1;
      this.player.potions = { tinyPotion: tinyPotions };
      this.characterService.saveCharacter(this.player);
    }
  }

  togglePause() {
    if (this.fighting) {
      this.fighting = false;
    } else this.fighting = true;
  }

  async saveAll() {
    this.characterService.updateCharacter(this.player);
  }

  async loadCharacter() {
    this.store
      .select((state) => CharacterState.selectCharacterStats(state.character))
      .pipe(untilDestroyed(this))
      .subscribe((character: Character) => {
        this.player = { ...character };
      });
  }

  calculateEquipmentStats() {
    let dmg = 0;
    let armour = 0;
    let evasion = 0;
    let hpMax = 0;
    let accuracy = 0;

    if (this.player.equipment) {
      this.playerBonus = {
        damage: this.calculateDamage(dmg),
        armour: this.calculateArmour(armour),
        evasion: this.calculateEvasion(evasion),
        hpMax: this.calculateHp(hpMax),
        accuracy: this.calculateAccuracy(accuracy),
      };
    } else
      this.playerBonus = {
        damage: 0,
        armour: 0,
        evasion: 0,
        hpMax: 0,
        accuracy: 0,
      };
  }

  calculateDamage(dmg: number) {
    for (let i = 0; i <= 9; i++) {
      if (this.player.equipment[i]?.damage) {
        dmg += this.player?.equipment[i]?.damage;
      }
    }
    return dmg;
  }

  calculateArmour(armour: number) {
    for (let i = 0; i <= 9; i++) {
      if (this.player.equipment[i]?.armour) {
        armour += this.player?.equipment[i]?.armour;
      }
    }
    return armour;
  }

  calculateEvasion(evasion: number) {
    for (let i = 0; i <= 9; i++) {
      if (this.player.equipment[i]?.evasion) {
        evasion += this.player?.equipment[i]?.evasion;
      }
    }
    return evasion;
  }

  calculateHp(hpMax: number) {
    for (let i = 0; i <= 9; i++) {
      if (this.player.equipment[i]?.hpMax) {
        hpMax += this.player?.equipment[i]?.hpMax;
      }
    }
    return hpMax;
  }

  calculateAccuracy(accuracy: number) {
    for (let i = 0; i <= 9; i++) {
      if (this.player.equipment[i]?.accuracy) {
        accuracy += this.player?.equipment[i]?.accuracy;
      }
    }
    return accuracy;
  }

  loadMonster(monsterName: string) {
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
  }

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

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  calculateRandomChance(chanceInPercentage: string | number) {
    return chanceInPercentage > Math.random() * 100;
  }
}
