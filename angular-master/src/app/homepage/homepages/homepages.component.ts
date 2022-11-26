import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-homepages',
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.css']
})
export class HomepagesComponent implements OnInit {

  private subs = new SubSink();
  menus:any
  menus1:any
  
  first_name: any;
  last_name: any;
  token : string | null = "";
  user_type: string | null = "";

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getDatas_special()
    this.getDatas_menu()
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
      this.user_type = JSON.parse(localStorage.getItem('user_type')!)
    }
    this.first_name = JSON.parse(localStorage.getItem('first_name') !);
    this.last_name = JSON.parse(localStorage.getItem('last_name') !);
  }

  getDatas_special() {
    this.subs.sink = this.data.getRecipies_special().valueChanges.subscribe((resp : any) => {
      this.menus = resp?.data?.getAllRecipe.recipes
    })
  }

  getDatas_menu() {
    this.subs.sink = this.data.getRecipies_menus().valueChanges.subscribe((resp : any) => {
      this.menus1 = resp?.data?.getAllRecipe.recipes
    })
  }

}
