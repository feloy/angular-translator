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
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { FrameComponent } from './frame/frame.component';
import { FrameSidenavComponent } from './frame-sidenav/frame-sidenav.component';
import { NewProjectComponent } from './forms/new-project/new-project.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    FrameSidenavComponent,
    NewProjectComponent,
    ProjectComponent,
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
          { path: 'project/:id', component: ProjectComponent }
        ]
      }
    ]),
    BrowserAnimationsModule,
    // Material
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
  ],
  providers: [
    ProjectsService,
    BackendService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
