import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { MaterialModule } from '../material/material.module';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ValidationPetComponent } from './validation-pet/validation-pet.component';
import { NewPasswordComponent } from './new-password/new-password.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ResetPasswordComponent,
    ValidationPetComponent,
    NewPasswordComponent
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
  exports : [
    ResetPasswordComponent,
    NewPasswordComponent,
    ValidationPetComponent
  ]
})
export class ResetPasswordModule { }
