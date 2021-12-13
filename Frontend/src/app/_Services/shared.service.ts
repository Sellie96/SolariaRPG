import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { NavComponent } from '../nav/nav.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  baseUrl = environment.apiUrl;

  constructor() {}

}
