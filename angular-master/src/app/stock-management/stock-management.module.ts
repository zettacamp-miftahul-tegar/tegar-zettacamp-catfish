import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MaterialModule } from '../material/material.module';
import { StockManagementComponent } from './stock-management.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    InputComponent,
    StockManagementComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ], 
  exports: [
    StockManagementComponent,
    InputComponent,
    UpdateComponent
  ]
})
export class StockManagementModule { }
