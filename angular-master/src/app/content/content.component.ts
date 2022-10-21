import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  user = [
    {name: 'Miftahul Tegar Pangestu', alamat:'Jogjakarta'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addNewName(row: { name:string; alamat:string;}) {
    this.user.push(row);
  }

}
