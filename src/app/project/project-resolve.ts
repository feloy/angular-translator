import { ProjectsService } from './../services/projects.service';
import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectResolve implements Resolve<Project> {

  constructor(private projects: ProjectsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> | Project {
    const id = +route.params['id'];
    return this.projects.get(id);
  }
}
