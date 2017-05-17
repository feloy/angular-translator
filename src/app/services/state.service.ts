import { Injectable, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class StateService {

  public deviceType$ = new ReplaySubject<string>(1);

  constructor() {
    this.initDeviceType();
  }

  private initDeviceType() {
    if (isPlatformBrowser(PLATFORM_ID)) {
      Observable.fromEvent(window, 'resize')
        .startWith({ target: { innerWidth: window.innerWidth } })
        .debounceTime(300)
        .map(event => this.convertWidthToDeviceType(event))
        .distinctUntilChanged()
        .subscribe((device: string) => this.deviceType$.next(device));
    }
  }

  private convertWidthToDeviceType(e) {
    if (e.target.innerWidth >= 800) {
      return 'desktop';
    } else {
      return 'mobile';
    }
  }
}
