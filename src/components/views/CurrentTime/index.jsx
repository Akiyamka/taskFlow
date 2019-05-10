import React from 'react';
import './index.scss';

const CurrentTime = ({ time, marginTop }) => {
  return (
    <div style={{ marginTop }} id='current-time'>
      <div id='time-now'>{time}</div>
      <div id='line-now' />
    </div>
  );
};

export default CurrentTime;
