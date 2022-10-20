import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  person = [
    {name: 'tegar'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addNewName(row: { name:string;}) {
    this.person.push(row);
  }

}
