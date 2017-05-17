import { CanDeactivateProjectService } from './services/can-deactivate-project.service';
import { GithubService } from './services/github.service';
import { StateService } from './services/state.service';
import { ProjectResolve } from './project/project-resolve';
import { BackendService } from './services/backend.service';
import { ProjectsService } from './services/projects.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { FrameComponent } from './frame/frame.component';
import { FrameSidenavComponent } from './frame-sidenav/frame-sidenav.component';
import { NewProjectComponent } from './forms/new-project/new-project.component';
import { ProjectComponent } from './project/project.component';
import { ProgressionComponent } from './widgets/progression/progression.component';
import { SourceMsgsListComponent } from './source-msgs-list/source-msgs-list.component';
import { MsgEditComponent } from './forms/msg-edit/msg-edit.component';
import { HomeComponent } from './home/home.component';
import { PluralEditorComponent } from './controls/plural-editor/plural-editor.component';
import { SelectEditorComponent } from './controls/select-editor/select-editor.component';
import { LocationDetailsComponent } from './widgets/location-details/location-details.component';
import { AboutComponent } from './about/about.component';

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
    HomeComponent,
    PluralEditorComponent,
    SelectEditorComponent,
    LocationDetailsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
        appId: 'angular-translator'
    }),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '', component: FrameComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'about', component: AboutComponent },
          { path: 'newproject', component: NewProjectComponent },
          {
            path: 'project/:id/edit', component: NewProjectComponent, resolve: { project: ProjectResolve }
          },
          {
            path: 'project/:id', component: ProjectComponent,
            resolve: { project: ProjectResolve },
            canDeactivate: [ CanDeactivateProjectService ],
            children: [
              { path: ':msgid', component: MsgEditComponent }
            ]
          }
        ]
      }
    ]),
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [
    BackendService,
    GithubService,
    ProjectsService,
    StateService,
    ProjectResolve,
    CanDeactivateProjectService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
