import { ProjectsService } from './../services/projects.service';
import { Translation } from './../models/translation';
import { Source } from './../models/source';
import { GithubService } from './../services/github.service';
import { Project } from './../models/project';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public progression: Observable<string | boolean | Source | Translation> = null;
  public source: Source = null;
  public translation: Translation = null;

  constructor(private route: ActivatedRoute, private router: Router, private github: GithubService,
    private projects: ProjectsService) { }

  ngOnInit() {
    this.route.data.pluck('project').subscribe((p: Project) => {
      this.progression = null;
      this.setSource(null);
      this.project = p;
      this.onReload();
    });

    this.projects.currentTranslation$.subscribe( (tr: Translation) => {
      this.translation = tr;
      console.log('new translation');
    });
  }

  public onReload() {
    this.setSource(null);
    this.progression = null;
    this.setTranslation(null);
    setTimeout(() => {
      this.progression = this.github.getSource(this.project)
        .do(v => {
          if (typeof v !== 'string' && typeof v !== 'boolean') {
            this.setSource(v);
          }
        });
    }, 0);
  }

  public onTranslationChanged(translation: string) {
    this.progression = null;
    this.setTranslation(null);
    setTimeout(() => {
      this.progression = this.github.getTranslation(this.project, translation)
        .do(v => {
          if (typeof v !== 'string' && typeof v !== 'boolean') {
            this.setTranslation(v);
          }
        });
    }, 0);
  }

  public onMsgClicked(msgId: string) {
    this.router.navigate(['/project', this.project.id, msgId]);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private setTranslation(tr: Translation) {
//    this.translation = tr;
    this.projects.setCurrentTranslation(tr);
  }

  private setSource(src: Source) {
    this.source = src;
    this.projects.setCurrentSource(src);
  }
}
