import React from 'react';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/client';

import client from './graphql/client';
import { ControlHeader, DisplayBox } from './components';

const AppWrapper = styled.div`
  text-align: center;
  height: 35px;
`;

const CircleBackApp = () => (
  <ApolloProvider client={client}>
    <AppWrapper>
      <ControlHeader />
      <DisplayBox />
    </AppWrapper>
  </ApolloProvider>
);

export default CircleBackApp;