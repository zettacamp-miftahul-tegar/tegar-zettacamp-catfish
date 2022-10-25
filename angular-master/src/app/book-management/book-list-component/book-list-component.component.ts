import { Component, OnInit, Input } from '@angular/core';
import { BookManagementService } from '../book-management.service'
import { Data } from '../data.model'

@Component({
  selector: 'app-book-list-component',
  templateUrl: './book-list-component.component.html',
  styleUrls: ['./book-list-component.component.css']
})
export class BookListComponentComponent implements OnInit {

  constructor(private data:BookManagementService) {};

  bookList: Data[] = [];
  selectedUser: Data | null = null;

  ngOnInit(): void {
    this.data.bookList$.subscribe(bookList => {
      this.bookList = bookList;
      console.log(bookList);
    })
  }

}