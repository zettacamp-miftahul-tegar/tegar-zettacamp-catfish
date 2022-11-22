import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  query: any;

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
            id
            imgUrl
            recipe_name
            price
            available
          }
        }
      }`,
      variables: {
        ...pagination,
        status: 'publish'
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  addCart(post: any) {

    this.query = gql `mutation AddCart($cart: MenuInput) {
      addCart(cart: $cart) {
        _id
        user_id
        cart {
          recipe_id {
            recipe_name
            price
          }
          id
          amount
          note
        }
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        cart:post
    },
    fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
  })}

  

}
