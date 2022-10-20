import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  user = [
    {name: 'Miftahul Tegar Pangestu'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addNewName(row: { name:string;}) {
    this.user.push(row);
  }

}
