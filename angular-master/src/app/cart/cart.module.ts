import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { MaterialModule } from '../material/material.module';
import { CartBuyComponent } from './cart-buy/cart-buy.component';
import { UpdateComponent } from './update/update.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomepageComponent } from '../homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const routes : Routes = [
  {
    path:'', component:HomepageComponent,
    children:[
      {
        path:"menu", component:MenuComponent
      }
    ]
  }
]


@NgModule({
  declarations: [
    CartComponent,
    CartBuyComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
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
    CartComponent,
    UpdateComponent
  ]
})
export class CartModule { }
