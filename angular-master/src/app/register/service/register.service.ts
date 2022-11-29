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
      mutation CreateOneUser($email: String, $lastName: String, $firstName: String, $password: String, $confirmPassword: String, $status: String) {
        createOneUser(email: $email, last_name: $lastName, first_name: $firstName, password: $password, confirmPassword: $confirmPassword, status: $status) {
          id
          email
          password
          first_name
          last_name
          status
          role {
            user_type
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
        // role : post.role
      }
    })
  }
}
