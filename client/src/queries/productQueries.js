import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    allProducts {
      id
      imgSrc
      name
      slug
      onSale
      isNew
      stars
      originalPrice
      price
      category {
        name
        slug
      }
      description
    }
  }
`;

export const GET_SINGLE_PRODUCTS = gql`
  query {
    allProducts {
      name
    }
  }
`;
