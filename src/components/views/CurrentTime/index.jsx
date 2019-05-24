import React from 'react';
import './index.scss';

const CurrentTime = ({ time, height }) => (
  <div style={{ height }} id='current-time'>
    <div id='time-now'>{time}</div>
    <div id='line-now' />
  </div>
);

export default CurrentTime;
