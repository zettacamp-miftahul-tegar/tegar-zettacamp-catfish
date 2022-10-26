import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

const routes: Routes = [
  // melarikan ke dalam sbg children routernya
  {
    path:'admin',
    loadChildren:()=>import('./book-management/book-management.module').then(mod=>mod.BookManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


