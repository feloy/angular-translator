import { Component, OnInit, OnDestroy, ViewChild, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  constructor(private router: Router) { }

  ngOnInit() { }

  public onSidenavClicked() {
    this.sidenav.close();
  }

}
