import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { RecipeService } from './service/recipe.service';
import { Recepiens } from '../model/recepient.model'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private subs = new SubSink();
  recepien:Recepiens[] = []
  leng:any;

  @Input('debounce') public debounceTime: number = 300;

  constructor(private data: RecipeService) { }

  ngOnInit(): void {
    this.searchFilter()
    this.getDatas()
  }

  getDatas(paginationObj?: any) {

    const pagination: any = {
      page: paginationObj?.page ?? 1,
      limit: paginationObj?.limit ?? 6,
    }

    this.subs.sink = this.data.getRecipies(pagination, this.search).valueChanges.subscribe((resp : any) => {
      if(resp?.data?.getAllRecipe){
        this.paginator.length = resp.data.getAllRecipe.totalDocs;
        this.paginator.pageSize = this.pageSizeOptions[0];
        this.recepien = resp.data.getAllRecipe.recipes
        console.log(this.recepien);
        this.leng = resp?.data?.getAllRecipe?.recipes?.totalLength
      } else {
        this.paginator.length = 0;
        this.recepien = [];
      }
    },
    (err) => {
      this.paginator.length = 0;
      this.recepien = [];
    })
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizeOptions: number[] = [6];

  onPaginatorChange(event: PageEvent) {
    const pagination = {
      limit: event.pageSize,
      page: event.pageIndex+1,
    }
    this.getDatas(pagination)
  }

  // ------------------------------

  value = '';
  nameFilter = new FormControl();
  page = 1;
  search : any;
  maxPage : any;
  dataIngredients : any;

  searchFilter(paginationObj?:any) {
    this.nameFilter.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      this.search = val
      console.log(this.search);
      
      this.getDatas()
    });
  }

}
