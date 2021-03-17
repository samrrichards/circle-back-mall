import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Button, Label } from 'react-bootstrap';
import { groupBy } from 'lodash';
import { useQuery } from '@apollo/client';

import{ parseData, runSimulation, removeDots } from '../utils';
import { GET_SAMPLE_DATA } from '../graphql/queries';

const StyledHeader = styled.h1`
  @media (max-width: 767px) {
  & {
    font-size: 24px;
  }
}

@media (max-width: 530px) {
  & {
    font-size: 18px;
  }
}
`;

const initialState = {
  buttonText: 'Run Simulation',
  simRunning: false,
  startTime: '',
  endTime: '',
  simData: [],
};

const simReducer = (state, action) => {
  switch(action.type) {
    case 'load-data': 
      return { ...state, simData: action.simData }; 
    case 'update-time': 
      return { 
        ...state,
        startTime: action.startTime, 
        endTime: action.endTime
      }; 
    case 'run-simulation':
      return { ...state, simRunning: true };
    case 'end-simulation':
      return {
        ...state,
        simRunning: false,
        startTime: '',
        endTime: ''
      };
    default:
      return state;
  }
};

const ControlHeader = () => {
  const [ state, dispatch ] = useReducer(simReducer, initialState); 
  const { loading, error, data } = useQuery(GET_SAMPLE_DATA);

  const { simData, simRunning, startTime, endTime } = state;

  const updateTime = row => {
    const sliceTime = time => (time[0] === '0' ? time.slice(1) : time);
    const switchSuffix = suffix => (suffix === 'AM' ? 'PM' : 'AM');

    const incrementTime = arr =>
      Number(arr[0]) === 12 ? 1 : Number(arr[0]) + 1;
    const incrementSuffix = arr =>
      Number(arr[0]) === 11 ? switchSuffix(arr[1]) : arr[1];

    const startTime = sliceTime(row[0].startTime);
    const startArray = startTime.split(' ');

    const endTime = `${incrementTime(startArray)} ${incrementSuffix(
      startArray
    )}`;

    dispatch({type: 'update-time', startTime, endTime });
  };

  const endSimulation = () => {
    dispatch({ type: 'end-simulation' }); 
    removeDots(); 
  };

  const handleClick = () => {
    if (!simRunning) {
      runSimulation(simData, updateTime);

      dispatch({ type: 'run-simulation' })

      setTimeout(endSimulation, 12500 * simData.length);
    }
  };

  useEffect(() => {
    if (data && data.data) {
      const dataObj = groupBy(data.data.map(parseData), 'startTime');

      console.dir({ dataObj })
      dispatch({type: 'load-data', simData: Object.values(dataObj) });
    }
  }, [ data ]);

  const dateText = startTime === '12 AM'
        ? 'Sunday, April 8th, 2018'
        : 'Saturday, April 7th, 2018';

  return (
    <StyledHeader>
      {loading ? (
        <Label>Waiting for data...</Label>
      ) : error ? (
        <Label>Error loading data. Try refreshing the page.</Label>
      ) : simRunning ? (
        <Fragment>
          <Label>{startTime}</Label> to{' '}
          <Label>{endTime}</Label> on {dateText}
        </Fragment>
      ) : (
        <Button 
          bsStyle='primary' 
          bsSize='large' 
          onClick={handleClick}
        >
          Run Simulation
        </Button>
      )}
    </StyledHeader>
  );
};

export default ControlHeader;
