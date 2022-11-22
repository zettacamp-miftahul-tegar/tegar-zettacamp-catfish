import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialModule } from '../material/material.module';
import { MenuRecipeComponent } from './menu-recipe/menu-recipe.component';
import { InputComponent } from './input/input.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    MenuComponent,
    MenuRecipeComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    MenuComponent,
    MenuRecipeComponent
  ]
})
export class MenuModule { }
