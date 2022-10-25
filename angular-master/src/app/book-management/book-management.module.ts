import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagementComponentComponent } from './book-management-component/book-management-component.component';
import { BookListComponentComponent } from './book-list-component/book-list-component.component';
import { BookDetailComponentComponent } from './book-detail-component/book-detail-component.component';
import { BookCardComponentComponent } from './book-list-component/book-card-component/book-card-component.component';
import { BookManagementComponent } from './book-management.component';



@NgModule({
  declarations: [
    BookManagementComponentComponent,
    BookListComponentComponent,
    BookDetailComponentComponent,
    BookCardComponentComponent,
    BookManagementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BookManagementModule { }
