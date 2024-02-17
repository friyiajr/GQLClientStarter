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
