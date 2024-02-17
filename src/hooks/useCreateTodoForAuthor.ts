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
