import React from 'react';
import './index.scss';

const TimeStep = ({ time, marginTop, marginBottom }) => {
  return (
    <div className='time-step'>
      <div className='text-line' style={{ marginTop }}>
        {time}
      </div>
      <div className='time-line' style={{ marginBottom }} />
    </div>
  );
};

export default TimeStep;
