import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUser} from '../../model/appUser';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  searchMode = false;
  userSub: Subscription;
  appUserSub: Subscription;
  appUser: AppUser;
  @Input() deviceXs: boolean;

  constructor(public router: Router,
              private auth: AuthService,
              private userService: UserService) {
    this.userSub = auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    });

  }

  ngOnInit() {
    this.appUserSub = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }

  onKeyPress() {
  }

  getFilteredList() {
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.appUserSub) {
      this.appUserSub.unsubscribe();
    }
  }
}



