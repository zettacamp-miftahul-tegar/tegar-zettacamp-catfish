import { Component, OnInit, Input } from '@angular/core';
import { BookManagementService } from '../../book-management.service'
import { Data } from '../../data.model'

@Component({
  selector: 'app-book-card-component',
  templateUrl: './book-card-component.component.html',
  styleUrls: ['./book-card-component.component.css']
})
export class BookCardComponentComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() card: any;

  constructor(private data:BookManagementService) {};

  selectData(data1: Data){
    this.data.setSelectedData(data1);
  }

}
