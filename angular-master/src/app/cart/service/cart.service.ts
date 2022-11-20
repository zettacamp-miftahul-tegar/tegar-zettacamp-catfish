import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  query: any;

  constructor(private apollo: Apollo) { }

  getCart() {
    return this.apollo.watchQuery({
      query : gql `
      query GetAllCart {
        getAllCart {
          user_id
          cart {
            id
            recipe_id {
              id
              recipe_name
              price
              imgUrl
            }
            amount
            note
            total_price
          }
          total_price
        }
      }`,
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  updateStock(post:any) {
    this.query = gql `
    mutation UpdateCart($amount: Int, $note: String, $itemId: ID) {
      updateCart(amount: $amount, note: $note, item_id: $itemId) {
        _id
        user_id
        cart {
          id
          recipe_id {
            recipe_name
            price
          }
          total_price
          amount
          note
        }
        total_price
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        itemId: post.item_id,
        amount: post.amount,
        note: post.note,
      }
    })
  }

  deleteOneCart(post:any) {
    this.query = gql `
    mutation RemoveMenu($itemId: ID) {
      removeMenu(item_id: $itemId) {
        _id
        user_id
        cart {
          id
          recipe_id {
            recipe_name
          }
          amount
        }
        status
      }
    }`

    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        itemId:post
      }
    })
  }

  deleteAllCart() {
    this.query = gql `
    mutation DeleteCart {
      deleteCart {
        _id
        cart {
          recipe_id {
            recipe_name
            price
          }
          note
          amount
          total_price
        }
        total_price
      }
    }`
  }

}
