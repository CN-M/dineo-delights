import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation addCategory($icon: String!, $name: String!) {
    addCategory(icon: $icon, name: $name) {
      id
      icon
      name
      slug
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID, $icon: String!, $name: String!) {
    updateCategory(id: $id, icon: $icon, name: $name) {
      id
      icon
      name
      slug
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      icon
      name
      slug
    }
  }
`;
