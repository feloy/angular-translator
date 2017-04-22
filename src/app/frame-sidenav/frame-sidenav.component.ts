import { Project } from './../models/project';
import { ProjectsService } from './../services/projects.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame-sidenav',
  templateUrl: './frame-sidenav.component.html',
  styleUrls: ['./frame-sidenav.component.css']
})
export class FrameSidenavComponent implements OnInit {

  public projects: Project[];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.projects$.subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

}
