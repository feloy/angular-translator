import { Msg, Source } from './../../models/source';
import { ProjectsService } from './../../services/projects.service';
import { Translation } from './../../models/translation';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-msg-edit',
  templateUrl: './msg-edit.component.html',
  styleUrls: ['./msg-edit.component.css']
})
export class MsgEditComponent implements OnInit {

  public icuBuilder = false;
  public locationsDetails = false;

  public trMsg: Msg = null;
  public srcMsg: Msg = null;

  public projectId: number;
  private msgId: string;

  form: FormGroup;
  srcCtrl: FormControl;
  trCtrl: FormControl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private projects: ProjectsService) { }

  ngOnInit() {

    this.createForm();

    const msgId$ = this.route.params.pluck('msgid');
    const projectId$ = this.route.parent.params.pluck('id');
    const tr$ = this.projects.currentTranslation$;
    const src$ = this.projects.currentSource$;

    Observable.combineLatest(projectId$, msgId$, tr$, src$)
      .subscribe(([projectId, msgId, tr, src]: [string, string, Translation, Source]) => {
        if (projectId === null || msgId === null || tr === null || src === null) {
          this.trMsg = null;
          this.srcMsg = null;
        } else {
          this.projectId = +projectId;
          this.msgId = msgId;

          const trList = tr.msgs.filter((m: Msg) => m.id === msgId);
          this.trMsg = trList.length > 0 ? trList[0] : { id: msgId, content: '', icu: null };

          const srcList = src.msgs.filter((m: Msg) => m.id === msgId);
          this.srcMsg = srcList.length > 0 ? srcList[0] : { id: msgId, content: '', icu: null };

          this.createForm();
          this.form.setValue({
            src: this.srcMsg.content,
            tr: this.trMsg.content
          });
        }
      });
  }

  private createForm() {
    this.srcCtrl = new FormControl('');
    this.trCtrl = new FormControl('');
    this.form = this.fb.group({
      src: this.srcCtrl,
      tr: this.trCtrl
    });
  }

  public onSave() {
    this.projects.setTranslatedMsg(this.msgId, this.form.get('tr').value);
  }

  public onCancel() {
    this.createForm();
    this.form.setValue({
      src: this.srcMsg.content,
      tr: this.trMsg.content
    });
  }
}
