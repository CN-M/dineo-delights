import { gql } from "@apollo/client";

export const GET_DEAL_OF_THE_WEEK = gql`
  query {
    dealOfTheWeek {
      id
      deadline
      deal
    }
  }
`;
