import { StyleSheet, Text, View } from "react-native";
import { Home } from "./src/Home";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function App() {
  const client = new ApolloClient({
    uri: "http://192.168.2.28:3000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
