import { Project } from './../models/project';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class GithubService {

  constructor(private http: Http) { }

  getSource(p: Project): Observable<string | boolean> {
    const url = 'https://raw.githubusercontent.com/' + p.repo + '/master/' + p.i18ndir + '/' + p.source;
    const obs = new ReplaySubject<string | boolean>(0);
    obs.next('reading ' + url);
    this.http.get(url)
      .subscribe(
      (resp: Response) => {
        const data = resp.text();
        obs.next(true);
      },
      err => obs.next(false));

    return obs;
  }
}
