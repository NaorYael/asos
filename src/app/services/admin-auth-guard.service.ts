import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService,
              private userService: UserService) { }

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$
  //     // get the user from firebase db. (valueChanges() => return observable)
  //     .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
  //     // map all the user that isAdmin filed is equal to true.
  //     .pipe(map(appUser => appUser.isAdmin));
  // }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin));
  }
}
