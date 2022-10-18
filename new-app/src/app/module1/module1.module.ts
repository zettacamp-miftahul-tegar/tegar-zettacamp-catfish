import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Component3Component } from './component3/component3.component';
import { Component4Component } from './component4/component4.component';

const routes : Routes = [
  // berhubungan dengan routes di administrator
  {
    path:'', component:Component2Component,
    children:[
      {
        path:'',
        redirectTo:'/admin/home',
        pathMatch:'full'
      },
      {
        path: 'home',component:Component3Component
      },
      {
        path: 'list.foods',component:Component1Component
      },
      {
        path: 'settings',component:Component4Component
      },
    ]
  }
]

@NgModule({
  declarations: [
    Component1Component,
    Component2Component,
    Component3Component,
    Component4Component
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    Component1Component
  ]
})
export class Module1Module { }
