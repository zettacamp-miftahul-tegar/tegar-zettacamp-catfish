import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';

const uri = 'https://api.zettacamp.zetta-staging.work/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri, headers: new HttpHeaders().set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZlYzVjMmNlNjM1YjJmYjZhODFmMmQiLCJlbWFpbCI6Im0ubXVnbmllcjJAeW9wbWFpbC5jb20iLCJpYXQiOjE2Njc4NzkwMTEsImV4cCI6MTY2Nzk2NTQxMX0.83VamMn8HUdOb_-SNrq9ZVueldEUWJHf0BXXH4UjUrU')}),
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
