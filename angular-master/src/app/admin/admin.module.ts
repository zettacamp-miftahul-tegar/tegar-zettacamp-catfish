import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDosenComponent } from './list-dosen/list-dosen.component';
import { ListMahasiswaComponent } from './list-mahasiswa/list-mahasiswa.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from '../global-menu/side-nav/side-nav.component';

const routes : Routes = [
  { path:'', component:SideNavComponent,
    children:[
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
  }
]

@NgModule({
  declarations: [
    ListDosenComponent,
    ListMahasiswaComponent,
    FormBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FormBuilderComponent,
    ListDosenComponent,
    ListMahasiswaComponent
  ]
})
export class AdminModule { }
