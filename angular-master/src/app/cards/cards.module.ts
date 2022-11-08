import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from '../tables/tables.component';
import { TablesModule } from '../tables/tables.module';
import { AppComponent } from '../app.component';
import { MaterialModule } from '../material/material.module';
import { FilterComponent } from '../filter/filter.component';

const routes : Routes = [
  {
    path:'', component:AppComponent,
    children:[
      {
        path:"card", component:CardsComponent
      },
      {
        path:"table", component:TablesComponent
      },
      {
        path:"filter", component:FilterComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TablesModule,
    MaterialModule
  ],
  exports: [
    CardsComponent
  ]
})
export class CardsModule { }
