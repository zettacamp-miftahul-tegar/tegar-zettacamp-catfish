import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.css']
})
export class InputCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() accountAdded = new EventEmitter<{title: string, price: string, status: string}>();

  onCreateAccount(accountName: string, accountPrice:string, accountStatus: string) {
    this.accountAdded.emit({
      title: accountName,
      price: accountPrice,
      status: accountStatus
    });
    console.log(accountStatus);
  }

}
