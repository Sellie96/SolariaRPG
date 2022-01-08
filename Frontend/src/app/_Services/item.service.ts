import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createNewItem(){
    let model = {
      name: "TestName",
      type: "sword",
      level: 1,
      damage: 1,
      accuracy: 15,
      hpMax: 15,
      description: "testDescription"
    }
    return this.http.post<{token: string}>(this.baseUrl + '/item/create', model).subscribe(response => {
    })
  }

  getItem(itemName: string) {
    this.http.post<{ message: string; item: any }>(this.baseUrl + '/item/' + itemName, itemName).subscribe(ItemData => {
      console.log(ItemData.item);
      localStorage.setItem('heldItem', JSON.stringify(ItemData.item));
    });
  }

  getDrop(monster){
   let item;
    switch(monster) {
      case 'Goblin': 
      
      
      item = {
        name: "TestName",
        type: "weapon",
        level: 1,
        damage: 1,
        accuracy: 15,
        maxHp: 15,
        value: 15
      };
      break;
      case 'Goblin Archer': item = {
        name: "TestBow",
        type: "weapon",
        level: 2,
        damage: 11,
        accuracy: 25,
        maxHp: 27,
        value: 25
      };
      break;
    }
    return item;
  }


}

