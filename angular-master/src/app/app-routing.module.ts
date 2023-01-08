import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'login',
    loadChildren:()=>import('./login/login.module').then(mod=>mod.LoginModule)
  },
  {
    path:'',
    loadChildren:()=>import('./global-menu/global-menu.module').then(mod=>mod.GlobalMenuModule)
  },
  {
    path:'',
    loadChildren:()=>import('./mahasiswa/mahasiswa.module').then(mod=>mod.MahasiswaModule)
  },
  {
    path:'',
    loadChildren:()=>import('./dosen/dosen.module').then(mod=>mod.DosenModule)
  },
  {
    path:'',
    loadChildren:()=>import('./admin/admin.module').then(mod=>mod.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
