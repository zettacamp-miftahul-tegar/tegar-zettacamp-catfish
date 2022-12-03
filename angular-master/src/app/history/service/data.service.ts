import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  query: any;

  constructor(private apollo: Apollo) { }

  getHistory(pagination:any, val:any, status:any, last:any) {

    let nameFilter : any = ""
    if (val) {
      nameFilter = val
    }

    let statusFilter : any = ""
    if (status) {
      statusFilter = status
    }

    let lastFilter : any = ""
    if (last) {
      lastFilter = last
    }

    return this.apollo.watchQuery({
      query : gql `
      query GetAllTransaction ($page: Int, $limit: Int, $orderDate: String, $orderStatus: String, $lastName: String) {
        getAllTransaction (page: $page, limit: $limit, order_date: $orderDate, order_status: $orderStatus, last_name: $lastName) {
          page
          maxPage
          currentDocs
          totalDocs
          transactions {
            id
            total_price
            order_status
            order_date
            status
            user_id {
              first_name
              last_name
            }
            menu {
              id
              recipe_id {
                recipe_name
              }
              amount
              total_price
              note
            }
          }
          
        }
      }`,
      variables: {
        ...pagination,
        orderDate:nameFilter,
        orderStatus:statusFilter,
        lastName: lastFilter
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  getBALANCE(post:any) {
    return this.apollo.watchQuery({
      query : gql `
      query GetOneUser($getOneUserId: ID) {
        getOneUser(id: $getOneUserId) {
          id
          email
          password
          first_name
          last_name
          balance
          status
          role {
            user_type
          }
          friend_name
          pet_name
        }
      }`,
      variables : {
        getOneUserId : post.getOneUserId
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }
  
}
