import { Source } from './../../models/source';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface Line {
  str: string;
  res?: boolean;
}

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.css']
})
export class ProgressionComponent implements OnInit {

  @Input() details: Observable<string | boolean | Source>;
  @Output() close = new EventEmitter();
  public lines: Line[] = [];
  private currentLine: Line;
  public done = false;
  public state: boolean = null;

  constructor() { }

  ngOnInit() {
    this.details.subscribe((v: string | boolean) => {
      if (typeof v === 'string') {
        this.currentLine = { str: v };
        this.lines.push(this.currentLine);
      } else if (typeof v === 'boolean') {
        this.currentLine.res = v;
        this.currentLine = null;
        if (v === false) {
          this.state = false;
        }
      } else {
        this.done = true;
        this.state = true;
      }

    });
  }

}
