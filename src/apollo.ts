import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { defaults, typeDefs, resolvers } from './clientState';

const cache = new InMemoryCache({
  addTypename: true,
});

const stateLink = withClientState({
  defaults,
  typeDefs,
  resolvers,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink]),
});

export default client;
