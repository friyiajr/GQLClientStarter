import { useMutation } from "@apollo/client";

import { gql } from "../__generated__";

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

  const markTodoAsComplete = (todoId: string, completed: boolean) => {
    completeTodo({
      variables: {
        authorId,
        todoId,
        completed,
      },
    });
  };

  return {
    markTodoAsComplete,
    error,
    loading,
    data,
  };
};
