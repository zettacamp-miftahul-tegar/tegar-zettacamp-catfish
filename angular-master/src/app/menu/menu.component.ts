import { Component, OnInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { RecipeService } from './service/recipe.service';
import { Recepiens } from '../model/recepient.model'
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private subs = new SubSink();
  recepien:Recepiens[] = []

  constructor(private data: RecipeService) { }

  ngOnInit(): void {
    this.getDatas()
  }

  getDatas(paginationObj?: any) {

    const pagination: any = {
      page: paginationObj?.page ?? 1,
      limit: paginationObj?.limit ?? 4
    }

    this.subs.sink = this.data.getRecipies(pagination).valueChanges.subscribe((resp : any) => {

      this.paginator.length = resp.data.getAllRecipe.totalDocs;
      this.paginator.pageSize = this.pageSizeOptions[0];

      this.recepien = resp.data.getAllRecipe.recipes
    })
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizeOptions: number[] = [4];

  onPaginatorChange(event: PageEvent) {
    const pagination = {
      limit: event.pageSize,
      page: event.pageIndex+1,
    }
    this.getDatas(pagination)
  }

}
