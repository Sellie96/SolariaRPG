import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../_Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const isFighting = this.accountService.getIsFighting();
    console.log(isFighting, 'isFighting')
    if(isFighting) {
      this.accountService.stopFighting();
    } else {
      
    }
    return !isFighting
  }
  
}
