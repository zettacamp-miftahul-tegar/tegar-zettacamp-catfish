import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { VideosModule } from './videos/videos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VideosModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
