import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';
import { MaterialModule } from '../material/material.module';
import { AppComponent } from '../app.component';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { TranslateModule } from '@ngx-translate/core'; 
import { CardsComponent } from '../cards/cards.component';
import { AuthGuard } from '../cards/auth.guard';

const routes : Routes = [
  {
    path:'', component:AppComponent,
    children:[
      {
        path:"all-promos", component:TablesComponent
      },
      {
        path:"all-cards", component:CardsComponent, canActivate:[AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [
    TablesComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    TablesComponent,
    InputComponent
  ]
})
export class TablesModule { }
