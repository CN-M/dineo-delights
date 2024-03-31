import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query {
    allOrders {
      id
      cost
      nameOfCustomer
      items {
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
          id
          name
          slug
        }
        description
      }
    }
  }
`;
