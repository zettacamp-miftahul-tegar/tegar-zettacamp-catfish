import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Stocks } from 'src/app/model/stock.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  query: any;

  constructor(private apollo: Apollo) { }

  getStock() {
    return this.apollo.watchQuery({
      query : gql `query getAllIngredient{
        getAllIngredient {
          ingredients {
            id
            name
            stock
            status
          }
        }
      }`,
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  addStock(post:Stocks) {
    this.query = gql `
      mutation createIngredient ($name: String, $stock: Int) {
        createIngredient (name: $name, stock: $stock) {
          name
          stock
        }
      }`
      return this.apollo.mutate({
        mutation : this.query,
        variables: {
          ...post
      },
      })
  }

  deleteStock(post:any) {
    this.query = gql `
    mutation($id: ID) {
      deleteIngredient (id: $id) {
        id
        name
        stock
        status
      }
    }`
    const id = post
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        id:post
      }
    }).subscribe((subs) =>
      console.log(subs)
    )
  }

  updateStock(post:any) {
    this.query = gql `
    mutation updateIngredient($id: ID, $stock: Int, $status: String) {
      updateIngredient(id: $id, stock: $stock, status: $status)  {
        name
        stock
        status
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        id: post.id,
        stock: post.stock,
        status: post.status
      }
    })
  }

}
