import { Project } from './../models/project';
import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {

  constructor() { }

  public projectsList(): Project[] {
    try {
      let ret = JSON.parse(localStorage.getItem('projects'));
      if (ret === null) {
        ret = [];
      }
      return ret;
    } catch (e) {
      return [];
    }
  }

  public projectsSave(projects: Project[]) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

}
