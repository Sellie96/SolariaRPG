import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Character } from 'src/app/_modules/Character';
import { CharacterService } from 'src/app/_Services/character.service';

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.css'],
})
export class LootComponent implements OnInit {
  @Input() player: Character;

  backpack: any = [];
  numbers = [];
  backpackLimit: string | any[];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    setInterval(async () => {
      this.backpack.push(this.player.backpack);
      this.backpackLimit = Object.keys(this.backpack[0]);
      this.numbers = Array(this.backpackLimit.length)
        .fill(1)
        .map((x, i) => i);
      this.backpack = [];
    }, 1000);
  }

  sellItem(item, number) {
    let test = Object.assign([], this.player.backpack);
    this.player.gold += this.player.backpack[number].value;
    test.splice(number, 1);
    this.player.backpack = test;
    this.loadBackpack();
    this.characterService.saveCharacter(this.player);
  }

  loadBackpack() {
    this.backpack.push(this.player.backpack);
    this.backpackLimit = Object.keys(this.backpack[0]);
    this.numbers = Array(this.backpackLimit.length)
      .fill(1)
      .map((x, i) => i);
    this.backpack = [];
  }

  equipItem(item, number) {
    let equipment = Object.assign([], this.player.equipment);
    let equipmentHolder = JSON.parse(JSON.stringify(equipment));

    let backpack = Object.assign([], this.player.backpack);

    switch (this.player.backpack[number].type) {
      case 'weapon':
        if(Object.keys(this.player.equipment[0]).length !== 0) {
          backpack.push(this.player.equipment[0]);
        }
        equipmentHolder.splice(0, 1, this.player.backpack[number]);
        break;
      case 'shield':
        equipmentHolder.splice(1, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[1]).length !== 0) {
          backpack.push(this.player.equipment[1]);
        }
        break;
      case 'helm':
        equipmentHolder.splice(2, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[2]).length !== 0) {
          backpack.push(this.player.equipment[2]);
        }
        break;
      case 'body':
        equipmentHolder.splice(3, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[3]).length !== 0) {
          backpack.push(this.player.equipment[3]);
        }
        break;
      case 'legs':
        equipmentHolder.splice(4, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[4]).length !== 0) {
          backpack.push(this.player.equipment[4]);
        }
        break;
      case 'boots':
        equipmentHolder.splice(5, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[5]).length !== 0) {
          backpack.push(this.player.equipment[5]);
        }
        break;
      case 'gloves':
        equipmentHolder.splice(6, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[6]).length !== 0) {
          backpack.push(this.player.equipment[6]);
        }
        break;
      case 'necklace':
        equipmentHolder.splice(7, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[7]).length !== 0) {
          backpack.push(this.player.equipment[7]);
        }
        break;
      case 'ring':
        equipmentHolder.splice(8, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[8]).length !== 0) {
          backpack.push(this.player.equipment[8]);
        }
        break;
      case 'cape':
        equipmentHolder.splice(9, 1, this.player.backpack[number]);
        if(Object.keys(this.player.equipment[0]).length !== 0) {
          backpack.push(this.player.equipment[0]);
        }
        break;
    }

    this.player.backpack = backpack;

    let newBackpack = Object.assign([], this.player.backpack);
    newBackpack.splice(number, 1);
    this.player.backpack = newBackpack;
    this.player.equipment = equipmentHolder;
    this.loadBackpack();
    this.characterService.saveCharacter(this.player);
  }
}
