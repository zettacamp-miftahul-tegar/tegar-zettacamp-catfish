import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MenuManagementComponent } from './menu-management.component';
import { MaterialModule } from '../material/material.module';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    InputComponent,
    MenuManagementComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MenuManagementComponent,
    InputComponent,
    UpdateComponent
  ]
})
export class MenuManagementModule { }
