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
    console.log(data);
    localStorage.setItem(environment.tokenKey, JSON.stringify(data.login.token));
  }

  logOut() {
    localStorage.removeItem(environment.tokenKey);
  }
}
