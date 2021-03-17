import React, { Fragment, useEffect, useReducer } from 'react';
import { Button, Label } from 'react-bootstrap';
import { groupBy } from 'lodash';

import{ parseData, runSimulation, removeDots } from './utils';

import sampleData from './data/sample_data.json';
import './App.css';

const initialState = {
  buttonText: 'Run Simulation',
  simRunning: false,
  startTime: '',
  endTime: '',
  data: [],
};

const simReducer = (state, action) => {
  switch(action.type) {
    case 'load-data': 
      return { ...state, data: action.data }; 
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
}

const App = () => {
  const [state, dispatch] = useReducer(simReducer, initialState); 

  const { data, simRunning, startTime, endTime } = state;

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
      const simTime = 12500 * data.length;

      runSimulation(data, updateTime);

      dispatch({ type: 'run-simulation' })

      setTimeout(endSimulation, simTime);
    }
  };

  useEffect(() => {
    const dataObj = groupBy(sampleData.map(parseData), 'parsedTime');
    dispatch({type: 'load-data', data: Object.values(dataObj) });
  }, []);

  const dateText = startTime === '12 AM'
        ? 'Sunday, April 8th, 2018'
        : 'Saturday, April 7, 2018';

  return (
    <div className='App'>
      <h1>
        {simRunning ? (
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
      </h1>
      <div id='viewBox'>
        <svg
          viewBox='0 0 1440 866'
          xmlns='http://www.w3.org/2000/svg'
          className='SvgBox'
        />
      </div>
    </div>
  );
};

export default App;
