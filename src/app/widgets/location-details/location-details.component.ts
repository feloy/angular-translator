import { Observable } from 'rxjs/Observable';
import { ProjectsService } from './../../services/projects.service';
import { GithubService } from './../../services/github.service';
import { Location } from './../../models/source';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() location: Location;
  @Input() projectId: number;

  public content: Observable<string>;

  constructor(private projects: ProjectsService, private github: GithubService) { }

  ngOnInit() {
    const project = this.projects.get(this.projectId);
    this.content = this.github.getLocation(project, this.location);
  }

}
