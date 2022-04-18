import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../_modules/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl = environment.apiUrl;

  item: Item;

  constructor(private http: HttpClient) {}

  getItem(itemName: string) {
    return this.http.post<{item: Item }>(this.baseUrl + '/item/' + itemName, itemName);
  }

  createItem(modal: any) {
    this.http.post(this.baseUrl + '/item/create', modal).subscribe(ItemData => {
      console.log(ItemData);
    });

  }

  Helm(name) {
    let item;
    switch (name) {
      case "Bronze Helm": item = {name: "Bronze Helm", type: "helm", level: 1, damage: 5, accuracy: 9, value: 1}; break;
      case "Steel Helm": item = {name: "Steel Helm", type: "helm", level: 5, damage: 9, accuracy: 15, value: 5}; break;
      case "Dark Helm": item = {name: "Dark Helm", type: "helm", level: 15, damage: 17, accuracy: 20, value: 15}; break;
      case "DragonsBane Helm": item = {name: "DragonsBane Helm", type: "helm", level: 50, damage: 63, accuracy: 65, value: 50}; break;
      case "Elven Helm": item = {name: "Elven Helm", type: "helm", level: 25, damage: 23, accuracy: 30, value: 25}; break;
      case "Ice Helm": item = {name: "Ice Helm", type: "helm", level: 35, damage: 40, accuracy: 15, value: 30}; break;
    }

    return item;
  }

  Body(name) {
    let item;
    switch (name) {
      case "Bronze Body": item = {name: "Bronze Body", type: "body", level: 1, damage: 5, accuracy: 9, value: 1}; break;
      case "Steel Body": item = {name: "Steel Body", type: "body", level: 5, damage: 9, accuracy: 15, value: 5}; break;
      case "Dark Body": item = {name: "Dark Body", type: "body", level: 15, damage: 17, accuracy: 20, value: 15}; break;
      case "DragonsBane Body": item = {name: "DragonsBane Body", type: "body", level: 50, damage: 63, accuracy: 65, value: 50}; break;
      case "Elven Body": item = {name: "Elven Body", type: "body", level: 25, damage: 23, accuracy: 30, value: 25}; break;
      case "Ice Body": item = {name: "Ice Body", type: "body", level: 35, damage: 40, accuracy: 15, value: 30}; break;
    }

    return item;
  }

  Legs(name) {
    let item;
    switch (name) {
      case "Bronze Legs": item = {name: "Bronze Legs", type: "legs", level: 1, damage: 5, accuracy: 9, value: 1}; break;
      case "Steel Legs": item = {name: "Steel Legs", type: "legs", level: 5, damage: 9, accuracy: 15, value: 5}; break;
      case "Dark Legs": item = {name: "Dark Legs", type: "legs", level: 15, damage: 17, accuracy: 20, value: 15}; break;
      case "DragonsBane Legs": item = {name: "DragonsBane Legs", type: "legs", level: 50, damage: 63, accuracy: 65, value: 50}; break;
      case "Elven Legs": item = {name: "Elven Legs", type: "legs", level: 25, damage: 23, accuracy: 30, value: 25}; break;
      case "Ice Legs": item = {name: "Ice Legs", type: "legs", level: 35, damage: 40, accuracy: 15, value: 30}; break;
    }

    return item;
  }

  Boots(name) {
    let item;
    switch (name) {
      case "Bronze Boots": item = {name: "Bronze Boots", type: "boots", level: 1, damage: 5, accuracy: 9, value: 1}; break;
      case "Steel Boots": item = {name: "Steel Boots", type: "boots", level: 5, damage: 9, accuracy: 15, value: 5}; break;
      case "Dark Boots": item = {name: "Dark Boots", type: "boots", level: 15, damage: 17, accuracy: 20, value: 15}; break;
      case "DragonsBane Boots": item = {name: "DragonsBane Boots", type: "boots", level: 50, damage: 63, accuracy: 65, value: 50}; break;
      case "Elven Boots": item = {name: "Elven Boots", type: "boots", level: 25, damage: 23, accuracy: 30, value: 25}; break;
      case "Ice Boots": item = {name: "Ice Boots", type: "boots", level: 35, damage: 40, accuracy: 15, value: 30}; break;
    }

    return item;
  }

  getDrop(monster: string) {
   let item: string;
   let randomNumber = Math.round(Math.random() * 5);
    switch(monster) {
      case 'Goblin': 
      switch (randomNumber) {
        case 0: item = "Bronze Sword"; break;
        case 1: item = "Bronze Sword"; break;
        case 2: item = "Bronze Sword"; break;
        case 3: item = "Bronze Gloves"; break;
        case 4: item = "Bronze Gloves"; break;
        case 5: item = "Bronze Gloves"; break;
      } break;
      case 'Goblin Archer': 
      switch (randomNumber) {
        case 0: item = "Bronze Gloves"; break;
        case 1: item = "Steel Gloves"; break;
        case 2: item = "Dark Gloves"; break;
        case 3: item = "DragonsBane Gloves"; break;
        case 4: item = "Elven Gloves"; break;
        case 5: item = "Ice Gloves"; break;
      } break;
      case 'Goblin Berserker': 
      switch (randomNumber) {
        case 0: item = "Bronze Helm"; break;
        case 1: item = "Steel Helm"; break;
        case 2: item = "Dark Helm"; break;
        case 3: item = "DragonsBane Helm"; break;
        case 4: item = "Elven Helm"; break;
        case 5: item = "Ice Helm"; break;
      } break;
      case 'Hobgoblin': 
      switch (randomNumber) {
        case 0: item = "Bronze Body"; break;
        case 1: item = "Steel Body"; break;
        case 2: item = "Dark Body"; break;
        case 3: item = "DragonsBane Body"; break;
        case 4: item = "Elven Body"; break;
        case 5: item = "Ice Body"; break;
      } break;
      case 'Goblin Chief': 
      switch (randomNumber) {
        case 0: item = "Bronze Legs"; break;
        case 1: item = "Steel Legs"; break;
        case 2: item = "Dark Legs"; break;
        case 3: item = "DragonsBane Legs"; break;
        case 4: item = "Elven Legs"; break;
        case 5: item = "Ice Legs"; break;
      } break;
    }

    return item;
  }


}

