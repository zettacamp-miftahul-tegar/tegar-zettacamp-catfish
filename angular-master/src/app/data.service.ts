import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Datas } from './model/card.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  query: any;

  constructor(private apollo: Apollo) { }

  addPromo(post:Datas):Observable<any> {
    
    // let ref = post.ref
    // let title = post.title
    // let sub_title = post.sub_title
    // let description = post.description

    this.query = gql `
      mutation CreatePromo($post: PromoInput){
        CreatePromo(promo_input: $post) {
          ref
          title
          sub_title
          description
        }
      }`
      return this.apollo.mutate({
        mutation : this.query,
        variables: {
          post
        }
      })
  }

  getCards() {
    return this.apollo.watchQuery({
      query: gql `
      query{
        GetAllPromos( pagination: {limit:500, page:0}){
          ref
          title
          sub_title
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
