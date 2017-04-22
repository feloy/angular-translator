import { Source, Msg } from './../models/source';
import { Project } from './../models/project';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class GithubService {

  constructor(private http: Http) { }

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
          case 'xmb': parseFunc = this.parseXmb; break;
          case 'xliff': parseFunc = this.parseXliff; break;
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

  private parseXmb(data: string): Source {
    try {
      const source = {
        msgs: []
      };
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const domMsgs = xmlDoc.getElementsByTagName('msg');
      console.log(domMsgs.length + ' msgs');
      for (let i = 0; i < domMsgs.length; i++) {
        const domMsg = domMsgs.item(i);
        const msg: Msg = {
          id: domMsg.getAttribute('id'),
          desc: domMsg.getAttribute('desc'),
          meaning: domMsg.getAttribute('meaning'),
          locations: [],
          content: ''
        };
        const domLocations = domMsg.getElementsByTagName('source');
        for (let j = domLocations.length - 1; j >= 0; j--) {
          const domLocation = domLocations.item(j);
          const [sourcefile, linenumber] = domLocation.textContent.split(':');
          msg.locations.push({ sourcefile, linenumber: parseInt(linenumber, 10) });
          domMsg.removeChild(domLocation);
        }
        msg.content = domMsg.innerHTML;
        source.msgs.push(msg);
      }

      console.log(source);
      return source;
    } catch (e) {
      return null;
    }
  }

  private parseXliff(data: string): boolean {
    console.log('parsing xliff');
    return null;
  }
}
