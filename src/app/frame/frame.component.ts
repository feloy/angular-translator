import { StateService } from './../services/state.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit, OnDestroy {

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  public isMobile = false;
  private subs: Subscription[] = [];

  constructor(private router: Router, private state: StateService) { }

  ngOnInit() {

    this.subs.push(this.state.deviceType$.subscribe(t => {
      this.isMobile = t === 'mobile';
      if (this.isMobile) {
        this.sidenav.mode = 'over';
        if (this.router.url !== '/') {
          this.sidenav.close();
        }
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    }));

  }

  public onSidenavClicked() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
