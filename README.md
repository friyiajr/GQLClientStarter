# How to set up Apollo GraphQL with TypeScript and Expo ❤️

## Run the GraphQL Server

If you have ruby 3.2.2 set up on your machine feel free to clone my [repo here](https://github.com/friyiajr/graphql_proj) and run `rails server -b <YOUR LOCAL IP>` then `rails db:seed` to get you started.

## Install the dependancies

You'll need to run the following to install everything in the project you need for graphql

```bash
yarn add @apollo/client graphql
```

```bash
yarn add -D @graphql-codegen/cli @graphql-codegen/client-preset @parcel/watcher
```

## Set up your `codegen.ts`

Create this `codegen.ts` file and populate it with the following

```ts
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://<YOUR_LOCAL_IP>:3000/graphql",
  documents: ["src/**/*.{ts,tsx,graphql}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
```

After this you can add the following scripts to your package.json

```json
{
    ...
    "compile": "graphql-codegen",
    "watch": "graphql-codegen -w"
}
```

The next thing you want to do is to create a `src` directory and copy and paste the main App file into there:

```tsx
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

Go back into your App.tsx and wrap the Home component with the Apollo Provider

```tsx
import { StyleSheet } from "react-native";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./src/Home";

const client = new ApolloClient({
  uri: "http://192.168.2.28:3000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

At this point you should be able to add a graphql query to any file in your app and run `yarn run compile` or `watch` to be able to import the typed GraphQL files. Make sure to import `gql` from the `__generated__` in order to have actual type safety

Back in the `src` directory let make a query file `graphql/author.ts`

```ts
import { gql } from "../__generated__";

export const GET_ALL_AUTHORS = gql(`
  query GetAllAuthors {
    authors {
      id
      name
      createdAt
      updatedAt
    }
  }
`);
```

At this point you'll want to run the app and make sure no errors come up.

Then we can run our query and try things out

```tsx
import { GET_ALL_AUTHORS } from "./graphql/author";

export default function Home() {
  const { error, loading, data } = useQuery(GET_ALL_AUTHORS);
```

Lets try a simple mutation as well. Start by creating a new file `src/graphql/todos.ts`

```tsx
import { gql } from "../__generated__";

export const CREATE_TODO = gql(`
    mutation CreateTodo($title:String!, $message:String!, $authorId:ID!) {
      createTodo(input: {
        title:$title,
        message:$message,
        authorId:$authorId
      }) {
        authorId
        id
        title
        message
        completed
      }
    }
`);
```

You can then finish up by creating a basic mutation to see if that worked

```tsx
const [createTodoMutation, response] = useMutation(CREATE_TODO);

const create = () => {
  createTodoMutation({
    variables: {
      title: "In Button",
      message: "This is in the button",
      authorId: "1",
    },
  });
};
```
