import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipmentitem',
  templateUrl: './equipmentitem.component.html',
  styleUrls: ['./equipmentitem.component.css']
})
export class EquipmentitemComponent implements OnInit {

  @Input() player;
  @Input() item;

  constructor() { }

  ngOnInit(): void {
  }

}
