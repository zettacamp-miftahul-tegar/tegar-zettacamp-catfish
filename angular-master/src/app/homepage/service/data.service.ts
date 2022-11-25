import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  query: any;

  constructor(private apollo: Apollo) { }

  getRecipies() {
    return this.apollo.watchQuery({
      query : gql `query GetAllRecipes($specialOffer: Boolean) {
        getAllRecipes(special_offer: $specialOffer) {
          recipes {
            id
            recipe_name
            special_offer
            highlight
            price
            special_offer_price
            status
            imgUrl
          }
          page
          maxPage
          currentDocs
          totalDocs
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
      query : gql `query GetAllRecipes($highlight: Boolean) {
        getAllRecipes(highlight: $highlight) {
          recipes {
            id
            recipe_name
            special_offer
            highlight
            price
            special_offer_price
            status
            imgUrl
            __typename
          }
          page
          maxPage
          currentDocs
          totalDocs
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
