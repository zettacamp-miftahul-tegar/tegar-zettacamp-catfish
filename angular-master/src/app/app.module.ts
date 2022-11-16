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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomepageModule,
    LoginModule,
    HttpClientModule,
    GraphQLModule,
    StockManagementModule,
    MenuManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
