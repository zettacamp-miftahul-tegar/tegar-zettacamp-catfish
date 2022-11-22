import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) { }

  loginUser(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          login(email: "${email}", password: "${password}") {
            token
            user {
              first_name
              last_name
              user_id 
              role {
                user_type
                view_permission {
                  name
                  access
                }
              }
            }
          }
        }
      `
      }).pipe(
        map((resp) => {
          this.userLogin(resp.data);
          return resp;
        }),
      );
  }

  userLogin(data: any) {    
    localStorage.setItem(environment.tokenKey, JSON.stringify(data.login.token));
    localStorage.setItem(environment.user, JSON.stringify(data.login.user));
    localStorage.setItem(environment.user_type, JSON.stringify(data.login.user.role.user_type))
  }

  logOut() {
    localStorage.removeItem(environment.tokenKey);
  }
}
