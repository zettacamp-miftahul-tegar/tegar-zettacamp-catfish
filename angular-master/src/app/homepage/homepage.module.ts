import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { AppComponent } from '../app.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { AboutComponent } from '../about/about.component';
import { MaterialModule } from '../material/material.module';
import { MenuModule } from '../menu/menu.module';
import { AboutModule } from '../about/about.module';
import { HomepagesComponent } from './homepages/homepages.component';
import { StockManagementComponent } from '../stock-management/stock-management.component';
import { MenuManagementComponent } from '../menu-management/menu-management.component';

const routes : Routes = [
  {
    path:'', component:HomepageComponent,
    children:[
      {
        path:"homepage", component:HomepagesComponent
      },
      {
        path:"menu", component:MenuComponent
      },
      {
        path:"about", component:AboutComponent
      },
      {
        path:"stock-management", component: StockManagementComponent
      },
      {
        path:"menu-management", component: MenuManagementComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    HomepageComponent,
    HomepagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MenuModule,
    AboutModule
  ],
  exports: [
    HomepageComponent,
  ]
})
export class HomepageModule { }
