import { Project } from './../models/project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public project: Observable<Project>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.project = this.route.data.pluck('project');
  }

}
