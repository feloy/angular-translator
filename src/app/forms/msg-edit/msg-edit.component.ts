import { Msg, Source } from './../../models/source';
import { ProjectsService } from './../../services/projects.service';
import { Translation } from './../../models/translation';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-msg-edit',
  templateUrl: './msg-edit.component.html',
  styleUrls: ['./msg-edit.component.css']
})
export class MsgEditComponent implements OnInit {

  public trMsg: Msg = null;
  public srcMsg: Msg = null;

  constructor(private route: ActivatedRoute, private projects: ProjectsService) { }

  ngOnInit() {
    const msgId$ = this.route.params.pluck('msgid');
    const tr$ = this.projects.currentTranslation$;
    const src$ = this.projects.currentSource$;

    Observable.combineLatest(msgId$, tr$, src$).subscribe(([msgId, tr, src]: [{}, Translation, Source]) => {
      if (msgId === null || tr === null || src === null) {
        this.trMsg = null;
        this.srcMsg = null;
      } else {
        this.trMsg = tr.msgs.filter((m: Msg) => m.id === msgId)[0];
        this.srcMsg = src.msgs.filter((m: Msg) => m.id === msgId)[0];
      }
    });
  }

}
