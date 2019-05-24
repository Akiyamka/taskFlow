import React from 'react';
import './index.scss';

const TimeStep = ({ time, height, visibility }) => (
  <div className='time-step' style={{ visibility, height }}>
    <div className='text-line'>{time}</div>
    <div className='time-line' />
  </div>
);

export default TimeStep;
