import { gql } from "@apollo/client";

export const ADD_DEAL_OF_THE_WEEK = gql`
  query {
    dealOfTheWeek {
      id
      deadline
      deal
    }
  }
`;
