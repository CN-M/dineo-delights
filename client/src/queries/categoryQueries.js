import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query {
    allCategories {
      id
      name
      icon
      slug
    }
  }
`;

export const GET_SINGLE_CATEGORY = gql`
  query singleCategory($slug: String!) {
    singleCategory(slug: $slug) {
      id
      name
      icon
      slug
    }
  }
`;
