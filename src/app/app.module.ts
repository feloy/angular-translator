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
  MdSlideToggleModule,
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
import { HomeComponent } from './home/home.component';
import { PluralEditorComponent } from './controls/plural-editor/plural-editor.component';
import { SelectEditorComponent } from './controls/select-editor/select-editor.component';
import { LocationDetailsComponent } from './widgets/location-details/location-details.component';

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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '', component: FrameComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'newproject', component: NewProjectComponent },
          {
            path: 'project/:id/edit', component: NewProjectComponent, resolve: { project: ProjectResolve }
          },
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
    MdSlideToggleModule,
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
