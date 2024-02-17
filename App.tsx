import { StyleSheet, Text, View } from "react-native";
import { Home } from "./src/Home";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { createFragmentRegistry } from "@apollo/client/cache";
import { ESSENTIALS_FRAGMENT } from "./src/hooks/Fragments";

export default function App() {
  const client = new ApolloClient({
    uri: "http://192.168.2.28:3000/graphql",
    cache: new InMemoryCache({
      fragments: createFragmentRegistry(ESSENTIALS_FRAGMENT),
    }),
  });

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
