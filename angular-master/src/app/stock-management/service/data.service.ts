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

  getStock(pagination:any, val:any, statusF:any) {

    let nameFilter : any = ""
    if (val) {
      nameFilter = val
    }

    let statusFilter : any = ""
    if (statusF) {
      statusFilter = statusF
    }

    return this.apollo.watchQuery({
      query : gql `query getAllIngredient (
        $page: Int, $limit: Int, $name: String, $status: String
      ) {
        getAllIngredient (
          page: $page
          limit: $limit
          name : $name
          status: $status
        ) {
          ingredients {
            id
            name
            stock
            status
            isUsed
          }
          page
          maxPage
          currentDocs
          totalDocs
        }
      }`,
      variables: {
        ...pagination,
        name:nameFilter,
        status: "active"
      },
      fetchPolicy: "network-only"
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
    })
  }

  updateStock(post:Stocks) {
    this.query = gql `
    mutation updateIngredient($id: ID, $name: String, $stock: Int) {
      updateIngredient(id: $id, name: $name, stock: $stock)  {
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
        stock: post.stock
        // status: post.status
      }
    })
  }

  getFilter(pagination:any, searchText:any) {

    console.log(pagination, searchText);
    
    return this.apollo.watchQuery({
      query : gql `query GetAllIngredients($page: Int, $name: String) {
        getAllIngredient(page: $page, name: $name) {
          totalDocs
          page
          maxPage
          currentDocs
          ingredients {
            id
            name
            stock
            isUsed
            status
          }
        }
      }`,
      variables: {
        ...pagination.page,
        name : searchText.name
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

}
