import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getItem(itemName: string) {
    this.http.post<{ message: string; item: any }>(this.baseUrl + '/item/' + itemName, itemName).subscribe(ItemData => {
      console.log(ItemData.item);
      localStorage.setItem('heldItem', JSON.stringify(ItemData.item));
    });
  }

  Swords(name) {
    let item;
    switch (name) {
      case "Bronze Sword": item = {name: "Bronze Sword", type: "weapon", level: 1, damage: 5, accuracy: 9, value: 1}; break;
      case "Steel Sword": item = {name: "Steel Sword", type: "weapon", level: 5, damage: 9, accuracy: 15, value: 5}; break;
      case "Dark Sword": item = {name: "Dark Sword", type: "weapon", level: 15, damage: 17, accuracy: 20, value: 15}; break;
      case "DragonsBane Sword": item = {name: "DragonsBane Sword", type: "weapon", level: 50, damage: 63, accuracy: 65, value: 50}; break;
      case "Elven Sword": item = {name: "Elven Sword", type: "weapon", level: 25, damage: 23, accuracy: 30, value: 25}; break;
      case "Ice Sword": item = {name: "Ice Sword", type: "weapon", level: 35, damage: 40, accuracy: 15, value: 30}; break;
    }

    return item;
  }

  
  Gloves(name) {
    let item;
    switch (name) {
      case "Bronze Gloves": item = {name: "Bronze Gloves", type: "gloves", level: 1, damage: 5, accuracy: 9, value: 1}; break;
      case "Steel Gloves": item = {name: "Steel Gloves", type: "gloves", level: 5, damage: 9, accuracy: 15, value: 5}; break;
      case "Dark Gloves": item = {name: "Dark Gloves", type: "gloves", level: 15, damage: 17, accuracy: 20, value: 15}; break;
      case "DragonsBane Gloves": item = {name: "DragonsBane Gloves", type: "gloves", level: 50, damage: 63, accuracy: 65, value: 50}; break;
      case "Elven Gloves": item = {name: "Elven Gloves", type: "gloves", level: 25, damage: 23, accuracy: 30, value: 25}; break;
      case "Ice Gloves": item = {name: "Ice Gloves", type: "gloves", level: 35, damage: 40, accuracy: 15, value: 30}; break;
    }

    return item;
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

  getDrop(monster){
   let item;
   let randomNumber = Math.round(Math.random() * 5);
    switch(monster) {
      case 'Goblin': 
      switch (randomNumber) {
        case 0: item = this.Swords("Bronze Sword"); break;
        case 1: item = this.Swords("Steel Sword"); break;
        case 2: item = this.Swords("Dark Sword"); break;
        case 3: item = this.Swords("DragonsBane Sword"); break;
        case 4: item = this.Swords("Elven Sword"); break;
        case 5: item = this.Swords("Ice Sword"); break;
      } break;
      case 'Goblin Archer': 
      switch (randomNumber) {
        case 0: item = this.Gloves("Bronze Gloves"); break;
        case 1: item = this.Gloves("Steel Gloves"); break;
        case 2: item = this.Gloves("Dark Gloves"); break;
        case 3: item = this.Gloves("DragonsBane Gloves"); break;
        case 4: item = this.Gloves("Elven Gloves"); break;
        case 5: item = this.Gloves("Ice Gloves"); break;
      } break;
      case 'Goblin Berserker': 
      switch (randomNumber) {
        case 0: item = this.Helm("Bronze Helm"); break;
        case 1: item = this.Helm("Steel Helm"); break;
        case 2: item = this.Helm("Dark Helm"); break;
        case 3: item = this.Helm("DragonsBane Helm"); break;
        case 4: item = this.Helm("Elven Helm"); break;
        case 5: item = this.Helm("Ice Helm"); break;
      } break;
      case 'Hobgoblin': 
      switch (randomNumber) {
        case 0: item = this.Body("Bronze Body"); break;
        case 1: item = this.Body("Steel Body"); break;
        case 2: item = this.Body("Dark Body"); break;
        case 3: item = this.Body("DragonsBane Body"); break;
        case 4: item = this.Body("Elven Body"); break;
        case 5: item = this.Body("Ice Body"); break;
      } break;
      case 'Goblin Chief': 
      switch (randomNumber) {
        case 0: item = this.Legs("Bronze Legs"); break;
        case 1: item = this.Legs("Steel Legs"); break;
        case 2: item = this.Legs("Dark Legs"); break;
        case 3: item = this.Legs("DragonsBane Legs"); break;
        case 4: item = this.Legs("Elven Legs"); break;
        case 5: item = this.Legs("Ice Legs"); break;
      } break;
    }
    return item;
  }


}

