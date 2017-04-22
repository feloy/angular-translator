import { Project } from './../models/project';
import { Source } from './../models/source';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-source-msgs-list',
  templateUrl: './source-msgs-list.component.html',
  styleUrls: ['./source-msgs-list.component.css']
})
export class SourceMsgsListComponent implements OnInit {

  @Input() source: Source;
  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
