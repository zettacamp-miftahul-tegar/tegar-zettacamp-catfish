import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialModule } from '../material/material.module';
import { MenuRecipeComponent } from './menu-recipe/menu-recipe.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuRecipeComponent,
    InputComponent
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
