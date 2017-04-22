import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdIconModule, MdSidenavModule, MdToolbarModule, MdButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { FrameComponent } from './frame/frame.component';
import { FrameSidenavComponent } from './frame-sidenav/frame-sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    FrameSidenavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '', component: FrameComponent
      }
    ]),
    BrowserAnimationsModule,
    // Material
    MdIconModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
