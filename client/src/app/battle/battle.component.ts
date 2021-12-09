import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../_modules/member';
import { MembersService } from '../_Services/members.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { Monster } from '../_modules/Monster';
import { Observable } from 'rxjs';
import { CharacterState } from '../state/character.state';
import { Store } from '@ngxs/store';
import { SetCharacter } from '../state/character.actions';
import { Character } from '../_modules/Character';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
})
export class BattleComponent implements OnInit {
  customClass = 'customClass';
  member: Member;
  monster: Monster;
  monsterName: String;
  playerHpCurrent: number;
  monsterHpCurrent: number;
  characters: any[];


  character$: Observable<any> = this.store.select(CharacterState);

  constructor(private memberService: MembersService, private route: ActivatedRoute, private store: Store){}

  ngOnInit() {
    this.loadCharacter();
    // this.memberService.addCharacter();
    this.onDelete('61b132cca99c514bffb8991e');
    // this.loadMember();
    // this.loadMonster();
    this.gameLoop(); 
  }

  onDelete(characterId: string) {
    this.memberService.deleteCharacter(characterId);
  }

  loadCharacter() {
    this.characters = this.memberService.getCharacter();
    console.log(this.characters, 'test')
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
      this.store.dispatch(new SetCharacter(
        member.characters[0].hpCurrent,
        member.characters[0].hpMax,
        member.characters[0].xpCurrent,
        member.characters[0].xpMax,
        member.characters[0].damage,
        member.characters[0].accuracy,
        member.characters[0].armour,
        member.characters[0].evasion,
        member.characters[0].critChance));
      this.playerHpCurrent = member.characters[0].hpCurrent
      console.log(this.playerHpCurrent, 'test')
    })
  }

  loadMonster() {
    this.memberService.getMonster(this.route.snapshot.paramMap.get('monster')).subscribe(monster => {
      this.monster = monster;
      this.monsterName = monster.enemyName;
      this.monsterHpCurrent = monster.hpCurrent
      console.log(this.monsterHpCurrent, 'monster')
    })
  }

  gameLoop(){
  }
}
