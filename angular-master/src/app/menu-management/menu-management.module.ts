import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MenuManagementComponent } from './menu-management.component';
import { MaterialModule } from '../material/material.module';
import { UpdateComponent } from './update/update.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    InputComponent,
    MenuManagementComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    MenuManagementComponent,
    InputComponent,
    UpdateComponent
  ]
})
export class MenuManagementModule { }
