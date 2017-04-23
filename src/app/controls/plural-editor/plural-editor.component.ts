import { Msg, FormatMessage, FormatMessageCase } from './../../models/source';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plural-editor',
  templateUrl: './plural-editor.component.html',
  styleUrls: ['./plural-editor.component.css']
})
export class PluralEditorComponent implements OnInit {

  @Input() content: FormatMessage;
  constructor() { }

  ngOnInit() {
  }

  public isIcu(v: string | FormatMessageCase[]): boolean {
    return v instanceof Object;
  }
}
