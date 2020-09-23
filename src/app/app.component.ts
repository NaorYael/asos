import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {JsonService} from './services/json.service';
import {ScrollService} from './services/scroll.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(public mediaObserver: MediaObserver,
              public scrollService: ScrollService,
              public router: Router) {
  }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      // console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs';
    })
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  scrollToId(id: string) {
    // console.log("element id : ", id);
    this.scrollService.scrollToElementById(id);
  }
}
