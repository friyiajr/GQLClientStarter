# How to set up Apollo GraphQL with TypeScript and Expo ❤️

## Run the GraphQL Server

If you have ruby 3.2.2 set up on your machine feel free to clone my [repo here](https://github.com/friyiajr/graphql_proj) and run `rails server -b <YOUR LOCAL IP>` then `rails db:seed` to get you started.

### Set up GraphQL / Codegen the Environment

### Install the dependancies

You'll need to run the following to install everything in the project you need for graphql

```bash
yarn add @apollo/client graphql
```

```bash
yarn add -D @graphql-codegen/cli @graphql-codegen/client-preset @parcel/watcher
```

### Set up your `codegen.ts`

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
        fragmentMasking: false,
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

Go back into your App.tsx and wrap the Home component with the Apollo Provider

```tsx
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Home } from "./src/Home";

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
```

At this point you should be able to add a graphql query to any file in your app and run `yarn run compile` or `watch` to be able to import the typed GraphQL files. Make sure to import `gql` from the `__generated__` in order to have actual type safety

Back in the `src` directory let make a query file `graphql/author.ts`

## Writing your queries

### A note on code structure

When you use your GraphQL queries its usually a good idea to wrap them with a hook. You could, of course, just invoke `useMutation` and `useQuery` and hope for the best; but with all things in software, its usually best to keep things organized.

### Get All Todos Hook

Here we start by creating a folder to hold our hooks called `hooks`. Inside this folder, create a new file called `useTodosByAuthorId.ts`. You'll want to create this file:

```tsx
import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

export const GET_TODOS_FOR_AUTHOR = gql(`
  query GetTodosForAuthor($id:ID!) {
    getTodosForAuthor(id:$id) {
      id
      authorId
      title
      message
      completed
    }
  }
`);

export const useTodosByAuthorId = (id: string) => {
  const result = useQuery(GET_TODOS_FOR_AUTHOR, {
    variables: {
      id,
    },
  });

  return result;
};
```

We then go back to home and hard code the author id to 1

```tsx
export function Home() {
  const [visible, setVisible] = useState(false);

  const { data, loading, error, refetch } = useTodosByAuthorId("1");
```

We can then just plug this into the FlatList

```tsx
<FlatList
  data={data?.getTodosForAuthor}
  renderItem={(data) => {
    return <ListItem item={data.item} onPress={() => {}} />;
  }}
/>
```

Restarting the app should grab all the todos for that author

### Create Todos Hook

We are going to start by creating a fragment so we can share code. This can be done in three steps

1. Create a `src/hooks/Fragments.ts` file that will house our fragments
2. Add a fragment for the Essential items of a Todo to the file

```tsx
import { gql } from "../__generated__";

export const ESSENTIALS_FRAGMENT = gql(`
  fragment Essentials on Todo {
    authorId
    id
    title
    message
    completed
  }
`);
```

3. Register the Fragment.

```tsx
import { createFragmentRegistry } from "@apollo/client/cache";

const client = new ApolloClient({
  uri: "http://192.168.2.28:3000/graphql",
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(ESSENTIALS_FRAGMENT),
  }),
});
```

Next lets refactor the `useTodosByAuthorId` hook to use the fragment:

```tsx
export const GET_TODOS_FOR_AUTHOR = gql(`
  query GetTodosForAuthor($id:ID!) {
    getTodosForAuthor(id:$id) {
      ...Essentials
    }
  }
`);
```

Finally lets make the Create Todo Hook `src/hooks/useCreateTodo.ts`:

```tsx
import { useMutation } from "@apollo/client";

import { gql } from "../__generated__";

export const CREATE_TODO_FOR_AUTHOR = gql(`
  mutation CreateTodoForAuthor($title:String!, $message:String!, $authorId:ID!) {
    createTodo(input: { title:$title, message:$message, authorId:$authorId }) {
      ...Essentials
    }
  }
`);

export const useCreateTodo = (authorId: string) => {
  const [createTodo, { loading, error, data }] = useMutation(
    CREATE_TODO_FOR_AUTHOR
  );

  const createNewTodo = async (title: string, message: string) => {
    await createTodo({
      variables: {
        title,
        message,
        authorId,
      },
    });
  };

  return {
    createNewTodo,
    loading,
    error,
    data,
  };
};
```

We can then update Home to have the same properties

```tsx
  const { data, loading, error, refetch } = useTodosByAuthorId("1");
  const { createNewTodo } = useCreateTodo("1");

  ...

  const createTodo = async (title: string, message: string) => {
    await createNewTodo(title, message);
    setVisible(false);
    refetch();
  };
```

## Mark Todo as Complete Hook

Create a new file `useCompleteTodo.ts`

Enter the following Code:

```tsx
import { gql, useMutation } from "@apollo/client";

import { useCallback } from "react";

export const COMPLETE_TODO = gql(`
  mutation CompleteTodo($authorId:ID!, $todoId:ID!, $completed:Boolean!) {
    completeTodo(input:{
      authorId:$authorId,
      todoId:$todoId,
      completed:$completed
    }) {
      ...Essentials
    }
  }
`);

export const useCompleteTodo = (authorId: string) => {
  const [completeTodo, { error, loading, data }] = useMutation(COMPLETE_TODO);

  const markTodoAsComplete = useCallback((todoId: string, completed = true) => {
    completeTodo({
      variables: {
        authorId,
        todoId,
        completed,
      },
    });
  }, []);

  return {
    markTodoAsComplete,
    error,
    loading,
    data,
  };
};
```

Finally update the home component one last time

```tsx
const { markTodoAsComplete } = useCompleteTodo("1");

<FlatList
  data={data.getTodosForAuthor}
  renderItem={(data) => {
    const onPress = () => {
      markTodoAsComplete(data.item.id, !data.item.completed);
    };
    return <ListItem item={data.item} onPress={onPress} />;
  }}
/>;
```

# Now everything should work
