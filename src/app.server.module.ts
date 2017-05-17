import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
@NgModule({
  imports: [
          ServerModule,
          AppModule
  ],
  bootstrap: [
          AppComponent
  ]
})
export class AppServerModule {}
