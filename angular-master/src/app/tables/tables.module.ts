import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    TablesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class TablesModule { }
