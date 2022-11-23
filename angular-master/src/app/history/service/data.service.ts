import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  query: any;

  constructor(private apollo: Apollo) { }

  getHistory(pagination:any, val:any, status:any) {

    let nameFilter : any = ""
    if (val) {
      nameFilter = val
    }

    let statusFilter : any = ""
    if (status) {
      statusFilter = status
    }

    // console.log(statusFilter);
    

    return this.apollo.watchQuery({
      query : gql `
      query GetAllTransaction ($page: Int, $limit: Int, $orderDate: String, $orderStatus: String) {
        getAllTransaction (page: $page, limit: $limit, order_date: $orderDate, order_status: $orderStatus) {
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
          }
        }
      }`,
      variables: {
        ...pagination,
        orderDate:nameFilter,
        orderStatus:statusFilter
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }
  
}
