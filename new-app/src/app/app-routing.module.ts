import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component2Component } from './module1/component2/component2.component';

const routes: Routes = [
  // melarikan ke dalam sbg children routernya
  {
    path:'admin',
    loadChildren:()=>import('./module1/module1.module').then(mod=>mod.Module1Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
