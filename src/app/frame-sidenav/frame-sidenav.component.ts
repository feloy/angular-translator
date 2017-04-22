import { Project } from './../models/project';
import { ProjectsService } from './../services/projects.service';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-frame-sidenav',
  templateUrl: './frame-sidenav.component.html',
  styleUrls: ['./frame-sidenav.component.css']
})
export class FrameSidenavComponent implements OnInit {

  public languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' }
  ];

  public projects: Observable<Project[]>;

  constructor( @Inject(LOCALE_ID) protected localeId: string,
    private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.projectsService.projects$;
  }

}
