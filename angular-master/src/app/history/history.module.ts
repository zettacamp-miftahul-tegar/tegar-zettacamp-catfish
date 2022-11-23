import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HistoryComponent
  ]
})
export class HistoryModule { }
