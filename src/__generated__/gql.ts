/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nfragment Essentials on Todo {\n  authorId\n  id\n  title\n  message\n  completed\n}\n": types.EssentialsFragmentDoc,
    "\nmutation CompleteTodo($authorId:ID!, $todoId:ID!, $completed:Boolean!) {\n  completeTodo(input:{\n    authorId:$authorId,\n    todoId:$todoId,\n    completed:$completed\n  }) {\n    ...Essentials\n  }\n}\n": types.CompleteTodoDocument,
    "\nmutation CreateTodoForAuthor($title:String!, $message:String!, $authorId:ID!) {\n  createTodo(input: { title:$title, message:$message, authorId:$authorId }) {\n    ...Essentials\n  }\n}\n": types.CreateTodoForAuthorDocument,
    "\nquery GetTodosForAuthor($id:ID!) {\n  getTodosForAuthor(id:$id) {\n    ...Essentials\n  }\n}\n": types.GetTodosForAuthorDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment Essentials on Todo {\n  authorId\n  id\n  title\n  message\n  completed\n}\n"): (typeof documents)["\nfragment Essentials on Todo {\n  authorId\n  id\n  title\n  message\n  completed\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CompleteTodo($authorId:ID!, $todoId:ID!, $completed:Boolean!) {\n  completeTodo(input:{\n    authorId:$authorId,\n    todoId:$todoId,\n    completed:$completed\n  }) {\n    ...Essentials\n  }\n}\n"): (typeof documents)["\nmutation CompleteTodo($authorId:ID!, $todoId:ID!, $completed:Boolean!) {\n  completeTodo(input:{\n    authorId:$authorId,\n    todoId:$todoId,\n    completed:$completed\n  }) {\n    ...Essentials\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateTodoForAuthor($title:String!, $message:String!, $authorId:ID!) {\n  createTodo(input: { title:$title, message:$message, authorId:$authorId }) {\n    ...Essentials\n  }\n}\n"): (typeof documents)["\nmutation CreateTodoForAuthor($title:String!, $message:String!, $authorId:ID!) {\n  createTodo(input: { title:$title, message:$message, authorId:$authorId }) {\n    ...Essentials\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetTodosForAuthor($id:ID!) {\n  getTodosForAuthor(id:$id) {\n    ...Essentials\n  }\n}\n"): (typeof documents)["\nquery GetTodosForAuthor($id:ID!) {\n  getTodosForAuthor(id:$id) {\n    ...Essentials\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;