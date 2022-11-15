import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialModule } from '../material/material.module';
import { MenuRecipeComponent } from './menu-recipe/menu-recipe.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuRecipeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MenuComponent,
    MenuRecipeComponent
  ]
})
export class MenuModule { }
