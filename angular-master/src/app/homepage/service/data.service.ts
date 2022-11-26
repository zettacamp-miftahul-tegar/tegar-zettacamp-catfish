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
          recipes {
            id
            recipe_name
            price
            imgUrl
            special_offer
            special_offer_price
            highlight
          }
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

}
