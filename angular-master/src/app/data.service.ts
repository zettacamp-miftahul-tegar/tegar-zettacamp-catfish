import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Datas } from './model/card.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  query: any;

  constructor(private apollo: Apollo) {}

  addPromo(post: Datas): Observable < any > {

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
      mutation: this.query,
      variables: {
        post
      }
    })
  }

  getPromos(pagination: any) {
    return this.apollo.watchQuery({
      query : gql `query GetAllPromos(
        $pagination: PaginationInput
      ) { 
        GetAllPromos(
          pagination: $pagination
        ) {
          ref
          title
          sub_title
          description
        }
      }`,
      variables: {
        pagination
      }
    });
  }

  getPromosLength() {
    return this.apollo
      .query({
        query : gql `query GetAllPromos(
          $pagination: PaginationInput
        ) { 
          GetAllPromos(
            pagination: $pagination
          ) {
            ref
            title
            sub_title
            description
          }
        }`,
        variables: {
          pagination: {
            page: 0,
            limit: 0
          }
        }
      })
      .pipe(map((response: any) => {
        const data = response.data.GetAllPromos;
        return data.length;
    }));
  }

}
