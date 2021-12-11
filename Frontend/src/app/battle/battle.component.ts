import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../_modules/member';
import { MembersService } from '../_Services/character.service';
import { Monster } from '../_modules/Monster';
import { Observable } from 'rxjs';
import { CharacterState, CharacterStateModel } from '../state/character.state';
import { Select, Store } from '@ngxs/store';
import { Character } from '../_modules/Character';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
})
export class BattleComponent implements OnInit {
  member: Member;
  monster: Monster;
  monsterName: String;
  characters: any[];
  character: Character;
  userId: string;
  player: any;
  fighting: boolean = false;


  @Select(CharacterState)character$: Observable<CharacterStateModel>

  constructor(private memberService: MembersService, private route: ActivatedRoute, private store: Store, private router: Router){}

  ngOnInit() {
    this.loadCharacter();
    // this.loadMonster();
    this.fighting = true;
    this.gameLoop(); 
  }

  loadCharacter() {
    this.character$.subscribe(character => {
     this.player = {
       hp: character.hp,
       hpMax: character.hpmax,
       level: character.level, 
       xp: character.xp,
       xpMax: character.xpmax,
       damage: character.damage,
       accuracy: character.accuracy,
       armour: character.armour,
       evasion: character.evasion,
       critChance: character.critchance,
       id : character.characterId
      }
  });
  }


  loadMonster() {
  }

 async playerDied(){
    this.memberService.killCharacter(this.player.id);
    this.router.navigate(['/character-select']);
    await this.delay(1000);
    location.reload();

  }

  gameLoop(){
    setInterval(() => {
      this.player.hp -= 25

      console.log(this.player.hp)

      if (this.player.hp <= 0) {
        this.playerDied();
      }

      }, 3000);   
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}