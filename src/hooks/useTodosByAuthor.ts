import { useQuery } from "@apollo/client";

import { gql } from "../__generated__";

export const GET_TODOS_FOR_AUTHOR = gql(`
query GetTodosForAuthor($id:ID!) {
  getTodosForAuthor(id:$id) {
    ...Essentials
  }
}
`);

export const useTodosByAuthor = (id: string) => {
  const result = useQuery(GET_TODOS_FOR_AUTHOR, {
    variables: {
      id,
    },
  });

  return result;
};
