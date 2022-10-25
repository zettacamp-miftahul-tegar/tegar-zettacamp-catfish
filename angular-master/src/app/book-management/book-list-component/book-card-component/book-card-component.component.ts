import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-card-component',
  templateUrl: './book-card-component.component.html',
  styleUrls: ['./book-card-component.component.css']
})
export class BookCardComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() card: any;

}
