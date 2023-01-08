import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranskripDosenComponent } from './transkrip-dosen/transkrip-dosen.component';
import { Routes } from '@angular/router';

const routes : Routes = [
  {
    path:'transkrip-nilai', component:TranskripDosenComponent,
  }
]

@NgModule({
  declarations: [
    TranskripDosenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TranskripDosenComponent
  ]
})
export class DosenModule { }
