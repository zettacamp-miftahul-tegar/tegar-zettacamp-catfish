import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private apollo: Apollo) { }

  resetPassword(post:any) {
    return this.apollo.watchQuery({
      query : gql `
      query GetOneUser($email: String) {
        getOneUser(email: $email) {
          id
          email
          password
          first_name
          last_name
          balance
          status
          friend_name
          pet_name
        }
      }`,
      variables : {
        email : post.email
      },
      fetchPolicy: "network-only"
    })
  }

  resetPassword1(post:any, validation:any) {
    return this.apollo.watchQuery({
      query : gql `
      query GetOneUser($email: String, $friendName: String, $petName: String) {
        getOneUser(email: $email, friend_name: $friendName, pet_name: $petName) {
          id
          email
          password
          first_name
          last_name
          balance
          status
          friend_name
          pet_name
          __typename
        }
      }`,
      variables : {
        email : post.email,
        friendName : validation.friend_name,
        petName : validation.pet_name
      },
      fetchPolicy: "network-only"
    })
  }

  validation(EMAIL:any, FRIEND:any, PET:any, payload:any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation ResetPassword($email: String, $friendName: String, $petName: String, $password: String, $confirmPassword: String) {
        resetPassword(email: $email, friend_name: $friendName, pet_name: $petName, password: $password, confirm_password: $confirmPassword) {
          email
          password
          first_name
          last_name
          friend_name
          pet_name
        }
      }`,
      variables : {
        email : EMAIL.email,
        friendName : FRIEND.friend_name,
        petName : PET.pet_name,
        password : payload.password,
        confirmPassword : payload.confirmPassword
      }
    })
  }
}
