import { GithubService } from './../services/github.service';
import { Project } from './../models/project';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  public project: Project;
  private subs: Subscription[] = [];
  private progression: Observable<string | boolean> = null;

  constructor(private route: ActivatedRoute, private github: GithubService) { }

  ngOnInit() {
    this.route.data.pluck('project').subscribe((p: Project) => {
      this.progression = null;
      this.project = p;
    });
  }

  public onReload() {
    this.progression = this.github.getSource(this.project);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
