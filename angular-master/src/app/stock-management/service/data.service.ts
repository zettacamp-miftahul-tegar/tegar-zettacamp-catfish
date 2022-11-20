import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Stocks } from 'src/app/model/stock.model';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  query: any;

  constructor(private apollo: Apollo) { }

  getStock(pagination:any) {
    return this.apollo.watchQuery({
      query : gql `query getAllIngredient (
        $page: Int, $limit: Int, $name: String
      ) {
        getAllIngredient (
          page: $page
          limit: $limit
          name : $name
        ) {
          ingredients {
            id
            name
            stock
            status
            isUsed
          }
          page
          currentDocs
          totalDocs
        }
      }`,
      variables: {
        ...pagination
      },
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
    // .subscribe(subs => {
    //   console.log(subs)
    // }, err => 
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'name already to used !',
    // })
    // )
  }

  deleteStock(post:Stocks) {
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
    }).subscribe(subs => {
      console.log(subs)
    }, err => 
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'stock already to used !',
    })
    )
  }

  updateStock(post:Stocks) {
    this.query = gql `
    mutation updateIngredient($id: ID, $name: String, $stock: Int, $status: String) {
      updateIngredient(id: $id, name: $name, stock: $stock, status: $status)  {
        name
        stock
        status
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        id: post.id,
        name: post.name,
        stock: post.stock,
        status: post.status
      }
    })
    // .subscribe(subs => {
    //   console.log(subs)
    // }, err => 
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'stock already to used !',
    // })
    // )
  }

}
