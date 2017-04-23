import { Msg, FormatMessage, FormatMessageCase } from './../../models/source';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-editor',
  templateUrl: './select-editor.component.html',
  styleUrls: ['./select-editor.component.css']
})
export class SelectEditorComponent implements OnInit {

  @Input() content: FormatMessage;

  constructor() { }

  ngOnInit() {
  }

  public isIcu(v: string | FormatMessageCase[]): boolean {
    return v instanceof Object;
  }
}
