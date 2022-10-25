import { Component, OnInit } from '@angular/core';
import { Data } from '../data.model'
import { BookManagementService } from '../book-management.service'

@Component({
  selector: 'app-book-detail-component',
  templateUrl: './book-detail-component.component.html',
  styleUrls: ['./book-detail-component.component.css']
})
export class BookDetailComponentComponent implements OnInit {

  constructor(private data: BookManagementService) { }

  ngOnInit(): void {
    this.data.selectedData$.subscribe((data1) => {
      this.selectedData = data1;
    });
  }

  selectedData: Data | null = null;

}
