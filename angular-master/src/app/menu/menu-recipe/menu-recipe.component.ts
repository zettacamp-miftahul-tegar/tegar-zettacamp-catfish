import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Recepiens } from 'src/app/model/recepient.model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-menu-recipe',
  templateUrl: './menu-recipe.component.html',
  styleUrls: ['./menu-recipe.component.css']
})
export class MenuRecipeComponent implements OnInit {

  @Input() recipe: any;
  
  // pagination: any
  
  constructor(private data: RecipeService) {}

  ngOnInit(): void {
  }

  // selectData(){
  //   this.data.getRecipies(this.pagination);
  // }



}
