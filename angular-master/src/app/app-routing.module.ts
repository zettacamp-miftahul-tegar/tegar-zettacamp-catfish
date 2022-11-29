import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./homepage/homepage.module').then(mod=>mod.HomepageModule)
  },
  {
    path:'',
    loadChildren:()=>import('./cart/cart.module').then(mod=>mod.CartModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
