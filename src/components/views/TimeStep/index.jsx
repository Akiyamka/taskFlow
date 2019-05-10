import React from 'react';
import './index.scss';

const TimeStep = ({ time, marginTop, marginBottom }) => {
  return (
    <>
      <div className='text-line' style={{ marginTop }}>
        {time}
      </div>
      <div className='time-line' style={{ marginBottom }} />
    </>
  );
};

export default TimeStep;
