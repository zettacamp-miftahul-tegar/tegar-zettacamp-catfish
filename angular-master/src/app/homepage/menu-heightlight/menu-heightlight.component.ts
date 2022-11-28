import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-heightlight',
  templateUrl: './menu-heightlight.component.html',
  styleUrls: ['./menu-heightlight.component.css']
})
export class MenuHeightlightComponent implements OnInit {

  @Input() recipe: any;
  token!: string | null;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }
  }

}
