import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.css']
})
export class SpecialOfferComponent implements OnInit {

  @Input() recipe: any;
  token!: string | null;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }
  }

}
