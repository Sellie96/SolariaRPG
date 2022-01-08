import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment-slot',
  templateUrl: './equipment-slot.component.html',
  styleUrls: ['./equipment-slot.component.css']
})
export class EquipmentSlotComponent implements OnInit {

  @Input() player;

  constructor() { }

  ngOnInit(): void {
  }

}
