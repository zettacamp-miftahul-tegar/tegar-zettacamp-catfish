import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private apollo: Apollo) { }

  getRecipies(pagination: any) {
    return this.apollo.watchQuery({
      query : gql `query getAllRecipe(
        $page: Int, $limit: Int, $status: String
      ) { 
        getAllRecipe(
          page: $page
          limit: $limit
          status: $status
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
        status: 'active'
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

}
