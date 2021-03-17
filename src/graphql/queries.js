import { gql } from '@apollo/client';

export const GET_SAMPLE_DATA = gql`
  query GetSampleData {
    data {
      startTime
      zone
      entries
      exits
      occupancy
    }
  }
`;
