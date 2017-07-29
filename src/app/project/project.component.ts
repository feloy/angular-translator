import { CanComponentDeactivate } from './../services/can-deactivate-project.service';
import { Xlf } from './../models/xlf';
import { Xmb } from './../models/xmb';
import { ProjectsService } from './../services/projects.service';
import { Translation } from './../models/translation';
import { Source, Msg } from './../models/source';
import { GithubService } from './../services/github.service';
import { Project } from './../models/project';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public project: Project;
  private subs: Subscription[] = [];
  public progression: Observable<string | boolean | Source | Translation> = null;
  public source: Source = null;
  public translation: Translation = null;
  private filename = 'output.xml';
  public untranslatedOnlyToggle: boolean;
  public countTranslated;
  public needSave: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private github: GithubService,
    private projects: ProjectsService, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.subs.push(this.route.data.pluck('project').subscribe((p: Project) => {
      this.project = p;
      this.progression = null;
      this.setSource(null);
      this.onReload();
    }));

    this.subs.push(this.projects.currentTranslation$.subscribe((tr: Translation) => {
      this.translation = tr;

      this.countTranslated = this.translation ? this.translation.msgs.filter((m: Msg) => m.content !== '').length : 0;

      // Go to first untranslated message
      if (this.source && this.translation) {
        const list = this.source.msgs.filter((m: Msg) => {
          return this.translation.msgs.filter((t: Msg) => t.id === m.id && t.content !== '').length === 0;
        });
        if (list.length > 0) {
          this.navigateTo(list[0].id);
        }
      }
    }));

    this.subs.push(this.projects.needSave$.subscribe((b: boolean) => this.needSave = b));
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
    this.filename = translation;
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

  private navigateTo(msgId: string) {
    this.router.navigate(['/project', this.project.id, msgId]);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private setTranslation(tr: Translation) {
    this.projects.setCurrentTranslation(tr);
  }

  private setSource(src: Source) {
    this.source = src;
    this.projects.setCurrentSource(src);
  }

  public exportAs(fmt: 'xmb' | 'xlf') {
    let exportFunc;
    switch (fmt) {
      case 'xmb': exportFunc = Xmb.export; break;
      case 'xlf': exportFunc = Xlf.export; break;
    }

    const content = exportFunc(this.source, this.translation);

    const blob = new Blob([content], { type: 'application/xml' });
    let filename = this.filename;
    if (filename.substr(-3) !== fmt) {
      filename = filename.substr(0, filename.length - 3) + fmt;
    }
    FileSaver.saveAs(blob, filename);

    this.projects.setNeedSave(false);
  }

  public onEdit() {
    this.router.navigate(['/project', this.project.id, 'edit']);
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (this.needSave) {
      const snackBarRef = this.snackBar.open('Changes need to be saved', 'Ignore', { duration: 3000 });

      const dism$ = snackBarRef.afterDismissed().map(() => false);
      const act$ = snackBarRef.onAction().map(() => {
        this.projects.setNeedSave(false); // Ignore changes
        return true;
      });
      return Observable.merge(dism$, act$);
    } else {
      return true;
    }
  }
}
