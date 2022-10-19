import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { VideosComponent } from './videos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VideoComponent,
    VideosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    VideoComponent,
    VideosComponent
  ]
})
export class VideosModule { }
