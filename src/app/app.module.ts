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

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    FrameSidenavComponent,
    NewProjectComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '', component: FrameComponent,
        children: [
          { path: 'newproject', component: NewProjectComponent }
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
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
