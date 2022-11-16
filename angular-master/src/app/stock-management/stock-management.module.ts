import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MaterialModule } from '../material/material.module';
import { StockManagementComponent } from './stock-management.component';


@NgModule({
  declarations: [
    InputComponent,
    StockManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ], 
  exports: [
    StockManagementComponent,
    InputComponent
  ]
})
export class StockManagementModule { }
