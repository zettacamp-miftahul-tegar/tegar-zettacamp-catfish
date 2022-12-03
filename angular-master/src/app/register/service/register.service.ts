import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apollo: Apollo) { }

  registerUser(post:any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateOneUser($email: String, $lastName: String, $firstName: String, $password: String, $confirmPassword: String, $friendName: String, $petName: String) {
        createOneUser(email: $email, last_name: $lastName, first_name: $firstName, password: $password, confirmPassword: $confirmPassword, friend_name: $friendName, pet_name: $petName) {
          email
          password
          first_name
          last_name
          balance
          status
          friend_name
          pet_name
          role {
            view_permission {
              name
              access
            }
          }
        }
      }`,
      variables : {
        email : post.email,
        lastName : post.last_name,
        firstName : post.first_name,
        password : post.password,
        confirmPassword : post.confirmPassword,
        friendName : post.friend_name,
        petName : post.pet_name
      }
    })
  }
}
