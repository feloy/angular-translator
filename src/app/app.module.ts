import { GithubService } from './services/github.service';
import { StateService } from './services/state.service';
import { ProjectResolve } from './project/project-resolve';
import { BackendService } from './services/backend.service';
import { ProjectsService } from './services/projects.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdSelectModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { FrameComponent } from './frame/frame.component';
import { FrameSidenavComponent } from './frame-sidenav/frame-sidenav.component';
import { NewProjectComponent } from './forms/new-project/new-project.component';
import { ProjectComponent } from './project/project.component';
import { ProgressionComponent } from './widgets/progression/progression.component';
import { SourceMsgsListComponent } from './source-msgs-list/source-msgs-list.component';
import { MsgEditComponent } from './forms/msg-edit/msg-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    FrameSidenavComponent,
    NewProjectComponent,
    ProjectComponent,
    ProgressionComponent,
    SourceMsgsListComponent,
    MsgEditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '', component: FrameComponent,
        children: [
          { path: 'newproject', component: NewProjectComponent },
          {
            path: 'project/:id', component: ProjectComponent, resolve: { project: ProjectResolve }, children: [
              { path: ':msgid', component: MsgEditComponent }
            ]
          }
        ]
      }
    ]),
    BrowserAnimationsModule,
    // Material
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdSelectModule,
    MdSidenavModule,
    MdToolbarModule,
  ],
  providers: [
    BackendService,
    GithubService,
    ProjectsService,
    StateService,
    ProjectResolve
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
