import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookManagementComponent } from './book-management/book-management.component';
import { BookManagementModule } from './book-management/book-management.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookManagementModule,
    BrowserAnimationsModule,
    // BookManagementComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
