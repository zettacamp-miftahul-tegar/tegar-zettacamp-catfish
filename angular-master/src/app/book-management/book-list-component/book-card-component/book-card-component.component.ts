import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookManagementService } from '../../book-management.service'
import { Data } from '../../data.model'

@Component({
  selector: 'app-book-card-component',
  templateUrl: './book-card-component.component.html',
  styleUrls: ['./book-card-component.component.css']
})
export class BookCardComponentComponent implements OnInit {

  constructor(private data: BookManagementService ) {};

  // private route: ActivatedRoute = new ActivatedRoute;
  
  ngOnInit(): void {
  }

  @Input() card: any;

  selectData(data1: Data){
    this.data.setSelectedData(data1);
  }

}
