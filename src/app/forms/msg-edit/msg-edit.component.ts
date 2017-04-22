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

  public trMsg: Msg = null;
  public srcMsg: Msg = null;

  private msgId: string;

  form: FormGroup;
  srcCtrl: FormControl;
  trCtrl: FormControl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private projects: ProjectsService) { }

  ngOnInit() {

    this.createForm();

    const msgId$ = this.route.params.pluck('msgid');
    const tr$ = this.projects.currentTranslation$;
    const src$ = this.projects.currentSource$;

    Observable.combineLatest(msgId$, tr$, src$).subscribe(([msgId, tr, src]: [string, Translation, Source]) => {
      if (msgId === null || tr === null || src === null) {
        this.trMsg = null;
        this.srcMsg = null;
      } else {
        this.msgId = msgId;
        const trList = tr.msgs.filter((m: Msg) => m.id === msgId);
        this.trMsg = trList.length > 0 ? trList[0] : { id: msgId, content: ''};
        this.srcMsg = src.msgs.filter((m: Msg) => m.id === msgId)[0];
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
