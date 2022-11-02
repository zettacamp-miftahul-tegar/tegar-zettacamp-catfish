import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // melarikan ke dalam sbg children routernya
  {
    path:'admin',
    loadChildren:()=>import('./blogs/blogs.module').then(mod=>mod.BlogsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
