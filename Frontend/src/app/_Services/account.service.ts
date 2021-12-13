import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ReplaySubject, Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SetUser } from '../state/user.actions';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userId: string;
  private token: string;

  constructor(private http: HttpClient, private router: Router, private store: Store) {}


  getToken() {
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId(){
    return this.userId
  }

  login(model: any){
    return this.http.post<{token: string, userId: string}>(this.baseUrl + '/user/login', model).subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token){
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.userId = response.userId;
        this.store.dispatch(new SetUser(
          response.userId));
        this.router.navigate(['/character-select']);
        this.saveAuthData(token, this.userId);
      }
    })
  }

  register(model:any){
    return this.http.post<{token: string, userId: string}>(this.baseUrl + '/user/signup', model).subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token){
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.userId = response.userId;
        this.store.dispatch(new SetUser(
          response.userId));
        this.router.navigate(['/character-select']);
        this.saveAuthData(token, this.userId);
      }
    })
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    this.userId = authInformation.userId;
    this.store.dispatch(new SetUser(
      authInformation.userId));
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.userId = null;
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log('testAuthData', userId)

    if(!token){
     return null;
    }
    return {
      token: token,
      userId: userId
    }
  }
}
