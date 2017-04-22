import { Source } from './../models/source';
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
  public progression: Observable<string | boolean | Source> = null;
  public source: Source = null;

  constructor(private route: ActivatedRoute, private github: GithubService) { }

  ngOnInit() {
    this.route.data.pluck('project').subscribe((p: Project) => {
      this.progression = null;
      this.source = null;
      this.project = p;
    });
  }

  public onReload() {
    this.source = null;
    this.progression = this.github.getSource(this.project)
      .do(v => {
        if (typeof v !== 'string' && typeof v !== 'boolean') {
          this.source = v;
        }
      });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
