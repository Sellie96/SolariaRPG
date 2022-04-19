import { Component, Input, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/_Services/character.service';

@Component({
  selector: 'app-equipmentitem',
  templateUrl: './equipmentitem.component.html',
  styleUrls: ['./equipmentitem.component.css']
})
export class EquipmentitemComponent implements OnInit {

  @Input() player;
  @Input() item;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
  }

  unequip(item) {
    let equipment = Object.assign([], this.player.equipment);
    let equipmentHolder = JSON.parse(JSON.stringify(equipment));

    let backpack = Object.assign([], this.player.backpack);

    
    backpack.push(item);

    equipmentHolder[this.item] = {};

    this.player.equipment = equipmentHolder;
    this.player.backpack = backpack;
    this.characterService.saveCharacter(this.player);
  }

}
