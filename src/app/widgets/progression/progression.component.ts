import { Component, OnInit, Input } from '@angular/core';
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

  @Input() details: Observable<string | boolean>;

  lines: Line[] = [];
  currentLine: Line;

  constructor() { }

  ngOnInit() {
    this.details.subscribe((v: string | boolean) => {
      if (typeof v === 'string') {
        this.currentLine = { str: v };
        this.lines.push(this.currentLine);
      } else {
        this.currentLine.res = v;
        this.currentLine = null;
      }

    });
  }

}
