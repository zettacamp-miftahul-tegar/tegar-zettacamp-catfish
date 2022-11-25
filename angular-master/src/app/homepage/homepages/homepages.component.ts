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

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getDatas()
    this.getDatas1()
  }

  getDatas() {
    this.subs.sink = this.data.getRecipies().valueChanges.subscribe((resp : any) => {
      this.menus = resp?.data?.getAllRecipes.recipes
    })
  }

  getDatas1() {
    this.subs.sink = this.data.getRecipies_menus().valueChanges.subscribe((resp : any) => {
      this.menus1 = resp?.data?.getAllRecipe.recipes
      console.log(this.menus1);
      
    })
  }

}
