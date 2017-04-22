import { Project } from './../models/project';
import { ProjectsService } from './../services/projects.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-frame-sidenav',
  templateUrl: './frame-sidenav.component.html',
  styleUrls: ['./frame-sidenav.component.css']
})
export class FrameSidenavComponent implements OnInit {


  public projects: Observable<Project[]>;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.projectsService.projects$;
  }

}
