import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  query: any;

  constructor(private apollo: Apollo) { }

  getRecipies_special() {
    return this.apollo.watchQuery({
      query : gql `query GetAllRecipe($specialOffer: Boolean) {
        getAllRecipe(special_offer: $specialOffer) {
          page
          maxPage
          currentDocs
          totalDocs
          recipes {
            id
            special_offer_price
            special_offer
            discount
            imgUrl
            recipe_name
            price
            available
            __typename
          }
          __typename
        }
      }`,
      variables: {
        specialOffer: true
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  getRecipies_menus() {
    return this.apollo.watchQuery({
      query : gql `query getAllRecipe($highlight: Boolean) {
        getAllRecipe(
          highlight: $highlight
        ) {
          page
          maxPage
          currentDocs
          totalDocs
          recipes {
            id
            special_offer_price
            imgUrl
            recipe_name
            price
            available
            __typename
          }
          __typename
        }
      }`,
      variables: {
        highlight: true
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
