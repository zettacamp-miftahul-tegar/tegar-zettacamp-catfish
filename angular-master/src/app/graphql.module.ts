import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { environment } from 'src/environments/environment';

const uri = environment.apiUrl;
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri: uri });
  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(environment.tokenKey);
    const user = localStorage.getItem(environment.user);

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${JSON.parse(token)}` : ''
      }
    });

    return forward(operation);
  });

  return {
    link: authLink.concat(http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
