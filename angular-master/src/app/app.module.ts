import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomepageModule } from './homepage/homepage.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { GraphQLModule } from './graphql.module';
import { StockManagementModule } from './stock-management/stock-management.module';
import { MenuManagementModule } from './menu-management/menu-management.module';
import { CartModule } from './cart/cart.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HistoryModule } from './history/history.module';
import { RegisterModule } from './register/register.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RegisterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomepageModule,
    CartModule,
    LoginModule,
    HistoryModule,
    HttpClientModule,
    GraphQLModule,
    StockManagementModule,
    MenuManagementModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
