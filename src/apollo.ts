import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  // IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

// import introspectionQueryResultData from './introspection.json';

import { defaults, typeDefs, resolvers } from './clientState';

// let fragmentMatcher;

// if (introspectionQueryResultData) {
//   fragmentMatcher = new IntrospectionFragmentMatcher({
//     introspectionQueryResultData,
//   });
// }

// const cache = new InMemoryCache({ fragmentMatcher });
const cache = new InMemoryCache({
  addTypename: true,
});

const stateLink = withClientState({
  defaults,
  typeDefs,
  resolvers,
  // fragmentMatcher,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink]),
});

export default client;
