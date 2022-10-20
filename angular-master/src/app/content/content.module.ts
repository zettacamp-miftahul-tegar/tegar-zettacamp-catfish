import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContentComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    // ContentModule,
    ContentComponent,
    InputComponent,
  ]

})
export class ContentModule { }
