import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private apollo: Apollo) { }

  resetPassword(post:any): Observable<any> {
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
        email : post.email,
        friendName : post.friend_name,
        petName : post.pet_name,
        password : post.password,
        confirmPassword : post.confirmPassword
      }
    })
  }
}
