import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apollo: Apollo) { }

  getCards():Observable<any> {
    return this.apollo.query({
      query: gql `
      query{
        GetAllPromos( pagination: {limit:10, page:0}){
          image_url
          title
          sub_title
          ref
          description
        }
      }`
    })
  }

  getTables():Observable<any> {
    return this.apollo.query({
      query: gql `
      query{
        GetAllSchools( pagination: {limit:10, page:0}){
          short_name
          long_name
          status
        }
      }`
    })
  }

  getUsers(name: string): Observable<any> {
    return this.apollo.query({
      query: gql`
      query($name : String){
        GetAllUsers ( pagination:{page:0,limit:20}, last_name : $name ){
          _id
          civility
          first_name
          last_name
        }
      }
      `, variables: {
        name
      }
    })
  }

}
