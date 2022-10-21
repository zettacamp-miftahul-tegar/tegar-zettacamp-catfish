import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { BodyComponent } from './body/body.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContentComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
