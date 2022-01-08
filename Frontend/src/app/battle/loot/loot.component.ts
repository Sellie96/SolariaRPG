import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.css']
})
export class LootComponent implements OnInit {

  @Input() player;

  backpack: any = [];
  numbers = [];
  backpackLimit;

  constructor() {}

  ngOnInit(): void {

    setInterval(async () => {
    this.backpack.push(this.player.backpack)
    this.backpackLimit = Object.keys(this.backpack[0])
    this.numbers = Array(this.backpackLimit.length).fill(1).map((x,i)=>i);
    this.backpack = [];
    }, 1000);
  }

  sellItem(item, number) {
    let test = Object.assign([], this.player.backpack);
    this.player.gold += this.player.backpack[number].value
    test.splice(number, 1);
    this.player.backpack = test;
    this.loadBackpack();
  }

  loadBackpack() {
    this.backpack.push(this.player.backpack)
    this.backpackLimit = Object.keys(this.backpack[0])
    this.numbers = Array(this.backpackLimit.length).fill(1).map((x,i)=>i);
    this.backpack = [];
  }

  equipItem(item, number) {
    let test = Object.assign([], this.player.equipment);
    let x = JSON.parse(JSON.stringify(test));

    let test2 = Object.assign([], this.player.backpack);

    switch (this.player.backpack[number].type) {
      case "weapon": 
      x.splice(0, 1, this.player.backpack[number]);
      test2.push(this.player.equipment[0]);
      break;
      case "shield": 
      x.splice(1, 1, this.player.backpack[number]);
      test2.push(this.player.equipment[1]);
      break;
      case "helm": 
      x.splice(2, 1, this.player.backpack[number]);
      test2.push(this.player.equipment[2]);
      break;
      case "body": 
      x.splice(3, 1, this.player.backpack[number]);
      test2.push(this.player.equipment[3]);
      break;
      case "legs":
         x.splice(4, 1, this.player.backpack[number]);
         test2.push(this.player.equipment[4]);
      break;
      case "boots":
         x.splice(5, 1, this.player.backpack[number]);
         test2.push(this.player.equipment[5]);
      break;
      case "gloves":
         x.splice(6, 1, this.player.backpack[number]);
         test2.push(this.player.equipment[6]);
      break;
      case "necklace":
         x.splice(7, 1, this.player.backpack[number]);
         test2.push(this.player.equipment[7]);
      break;
      case "ring":
         x.splice(8, 1, this.player.backpack[number]);
         test2.push(this.player.equipment[8]);
      break;
      case "cape":
         x.splice(9, 1, this.player.backpack[number]);
         test2.push(this.player.equipment[9]);
      break;
    }

    
    this.player.backpack = test2;
    let test3 = Object.assign([], this.player.backpack);   
    test3.splice(number, 1);
    this.player.backpack = test3;
    this.player.equipment = x;
    this.loadBackpack();
  }
}
