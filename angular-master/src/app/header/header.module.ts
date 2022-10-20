import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NavComponent } from './nav/nav.component';
import { ContentModule } from '../content/content.module';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    ContentModule
  ],
  exports: [
    NavComponent,
    HeaderComponent
  ]
})
export class HeaderModule { }
