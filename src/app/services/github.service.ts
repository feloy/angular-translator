import { Xlf } from './../models/xlf';
import { Xmb } from './../models/xmb';
import { Translation } from './../models/translation';
import { Source, Msg, Location } from './../models/source';
import { Project } from './../models/project';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {

  constructor(private http: Http) { }

  /**
    * Get Source
    */
  public getSource(p: Project): Observable<string | boolean | Source> {
    const url = 'https://raw.githubusercontent.com/' + p.repo + '/master/' + p.i18ndir + '/' + p.source;
    const obs = new ReplaySubject<string | boolean>(0);
    obs.next('loading ' + url);
    this.http.get(url) // TODO make observable chain
      .subscribe(
      (resp: Response) => {
        const data = resp.text();
        obs.next(true);
        obs.next('detecting format (xliff or xmb)');
        const fmt = this.detectFormat(data);
        if (fmt === null) {
          obs.next(false);
          return;
        }
        obs.next(true);

        let parseFunc;
        switch (fmt) {
          case 'xmb': parseFunc = Xmb.parseSource; break;
          case 'xliff': parseFunc = Xlf.parseSource; break;
        }
        obs.next('parsing file in ' + fmt + ' format');
        const source = parseFunc(data);
        obs.next(source !== null);
        if (source === null) {
          return;
        }
        obs.next(source);
      },
      err => obs.next(false));

    return obs;
  }

  private detectFormat(data: string): 'xmb' | 'xliff' | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      if (xmlDoc.getElementsByTagName('messagebundle').length) {
        return 'xmb';
      } else if (xmlDoc.getElementsByTagName('xliff').length) {
        return 'xliff';
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Get translation
   * @param p
   * @param translation
   */
  public getTranslation(p: Project, translation: string): Observable<string | boolean | Translation> {
    const obs = new ReplaySubject<string | boolean | Translation>(0);
    const url = 'https://raw.githubusercontent.com/' + p.repo + '/master/' + p.i18ndir + '/' + translation;
    obs.next('loading ' + url);
    this.http.get(url) // TODO make observable chain
      .subscribe(
      (resp: Response) => {
        const data = resp.text();
        obs.next(true);
        obs.next('detecting format (xliff or xmb)');
        const fmt = this.detectFormat(data);
        if (fmt === null) {
          obs.next(false);
          return;
        }
        obs.next(true);

        let parseFunc;
        switch (fmt) {
          case 'xmb': parseFunc = Xmb.parseTranslation; break;
          case 'xliff': parseFunc = Xlf.parseTranslation; break;
        }
        obs.next('parsing file in ' + fmt + ' format');
        const tr = parseFunc(data);
        obs.next(tr !== null);
        if (tr === null) {
          return;
        }
        obs.next(tr);
      },
      err => {
        obs.next(true);
        const ret: Translation = { msgs: [] };
        obs.next(ret);
      });
    return obs;
  }

  public getLocation(p: Project, location: Location): Observable<string> {
    let filename = location.sourcefile;
    if (filename.substr(-3) === '.ts') {
      filename = filename.substr(0, filename.length - 3) + '.html';
    }

    const url = 'https://raw.githubusercontent.com/' + p.repo + '/master/src/' + filename;
    return this.http.get(url)
      .map(
      (resp: Response) => {
        const data = resp.text();
        const lines = data.split('\n');
        return lines.slice(Math.max(0, location.linenumber - 2), location.linenumber + 1).join('\n');
      },
      err => {
        return '';
      });

  }
}
