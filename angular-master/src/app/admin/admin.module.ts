import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDosenComponent } from './list-dosen/list-dosen.component';
import { ListMahasiswaComponent } from './list-mahasiswa/list-mahasiswa.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { Routes } from '@angular/router';

const routes : Routes = [
  {
    path:'list-dosen', component:ListDosenComponent,
  },
  {
    path:'list-mahasiswa', component:ListMahasiswaComponent,
  },
  {
    path:'form-builder', component:FormBuilderComponent,
  }
]

@NgModule({
  declarations: [
    ListDosenComponent,
    ListMahasiswaComponent,
    FormBuilderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormBuilderComponent,
    ListDosenComponent,
    ListMahasiswaComponent
  ]
})
export class AdminModule { }
