import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  get: any;

  constructor(private apollo: Apollo) { }

  getRecipies(pagination: any) {
    return this.apollo.watchQuery({
      query : gql `query getAllRecipe(
        $page: Int, $limit: Int
      ) { 
        getAllRecipe(
          page: $page
          limit: $limit
        ) {
          page
          maxPage
          currentDocs
          totalDocs
          recipes {
            imgUrl
            recipe_name
            price
            available
          }
        }
      }`,
      variables: {
        ...pagination, 
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

}
