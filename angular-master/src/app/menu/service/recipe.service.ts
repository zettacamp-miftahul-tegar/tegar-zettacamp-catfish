import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  query: any;

  constructor(private apollo: Apollo) { }

  getRecipies(pagination: any, val:any) {

    let nameFilter : any = ""
    if (val) {
      nameFilter = val
    }

    return this.apollo.watchQuery({
      query : gql `query GetAllRecipe($page: Int, $limit: Int, $status: String, $recipeName: String) {
        getAllRecipe(page: $page, limit: $limit, status: $status, recipe_name: $recipeName) {
          recipes {
            id
            recipe_name
            ingredients {
              ingredient_id {
                id
                name
                stock
                isUsed
                status
              }
              stock_used
            }
            totalLength
            price
            imgUrl
            available
            status
            special_offer
            special_offer_price
            highlight
            discount
          }
          page
          maxPage
          currentDocs
          totalDocs
        }
      }`,
      variables: {
        ...pagination,
        recipeName: nameFilter,
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
