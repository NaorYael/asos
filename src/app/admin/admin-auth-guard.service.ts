import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) {
  }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser) => appUser.isAdmin));

  }
}
