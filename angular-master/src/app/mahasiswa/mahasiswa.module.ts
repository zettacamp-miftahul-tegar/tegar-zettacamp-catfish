import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDosenProdiComponent } from './list-dosen-prodi/list-dosen-prodi.component';
import { Routes } from '@angular/router';

const routes : Routes = [
  {
    path:'list-dosen-prodi', component:ListDosenProdiComponent,
  }
]

@NgModule({
  declarations: [
    ListDosenProdiComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListDosenProdiComponent
  ]
})
export class MahasiswaModule { }
