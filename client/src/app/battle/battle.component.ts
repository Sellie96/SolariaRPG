import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../_modules/member';
import { MembersService } from '../_Services/members.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
})
export class BattleComponent implements OnInit {
  customClass = 'customClass';
  member: Member;
  hpCurrent: number;
  constructor(private memberService: MembersService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadMember();
    this.gameLoop(); 
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
      this.hpCurrent = member.characters[0].hpCurrent
      console.log(this.hpCurrent, 'test')
    })
  }

  gameLoop(){
    setInterval(function(){
      console.log(this.hpCurrent)
    }, 3000);
  }
}
