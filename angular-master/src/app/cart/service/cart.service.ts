import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import Swal from 'sweetalert2';

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
          total_price
          cart_length
          cart {
            id
            amount
            note
            total_price
            recipe_id {
              id
              available
              special_offer_price
              recipe_name
              price
              imgUrl
            }
          }
        }
      }`,
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  getCart1(post:any) {
    return this.apollo.watchQuery({
      query : gql `
      query GetAllCart {
        getAllCart {
          user_id
          total_price
          cart_length
          cart {
            id
            amount
            note
            total_price
            recipe_id {
              id
              special_offer_price
              recipe_name
              price
              available
              imgUrl
            }
          }
        }
      }`,
      variables: {
        ...post,
      },
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
    },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
      })
      .subscribe(subs => {
        // console.log(subs)
      }, err => 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    )
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
    return this.apollo.mutate({
      mutation : this.query,
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
      })
      .subscribe(subs => {
        // console.log(subs)
      }, err => 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    )
  }

  minusAmount(post:any) {
    this.query = gql `
    mutation UpdateAmountMenu($itemId: ID, $quantity: Int) {
      updateAmountMenu(item_id: $itemId, quantity: $quantity) {
        _id
        user_id
        cart {
          total_price
          recipe_id {
            status
            recipe_name
          }
          note
          amount
        }
        cart_length
        total_price
        status
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        itemId:post.id,
        quantity: -1
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  plesAmounts(post:any) {
    this.query = gql `
    mutation UpdateAmountMenu($itemId: ID, $quantity: Int) {
      updateAmountMenu(item_id: $itemId, quantity: $quantity) {
        _id
        user_id
        cart {
          total_price
          recipe_id {
            status
            recipe_name
          }
          note
          amount
        }
        cart_length
        total_price
        status
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        itemId:post.id,
        quantity: 1
        // quantity: 1 > post.amount
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
      })
  }

  addBuyPrice() {
    this.query = gql `
    mutation CreateTransaction {
      createTransaction {
        id
        menu {
          recipe_id {
            recipe_name
            price
          }
          amount
          total_price
        }
        total_price
        order_date
        order_status
        status
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
    
  }

  getRecipies(pagination: any) {

    return this.apollo.watchQuery({
      query : gql `query getAllRecipe(
        $page: Int, $limit: Int, $status: String, $recipeName: String
      ) { 
        getAllRecipe(
          page: $page
          limit: $limit
          status: $status
          recipe_name: $recipeName
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
          }
        }
      }`,
      variables: {
        ...pagination,
      },
    })
  }


}