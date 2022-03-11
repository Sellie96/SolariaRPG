import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monster-stats',
  templateUrl: './monster-stats.component.html',
  styleUrls: ['./monster-stats.component.css']
})
export class MonsterStatsComponent implements OnInit {
  
  @Input() monster;
  @Input() stat;
  @Input() description;
  
  constructor() { }

  ngOnInit(): void {
  }

}
