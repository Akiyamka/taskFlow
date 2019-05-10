import React, { useState } from 'react';
import { connect } from 'unistore/react';
import actions from '../../../store/actions';
import './index.scss';

const TotalTime = ({ changeTimeLine }) => {
  const [start, setStart] = useState('00:00');
  const [end, setEnd] = useState('23:59');
  const [timeStatus, setStatus] = useState('access');
  const setStartTime = (e) => {
    const timeStart = e.target.value.split(':');
    setStart(e.target.value);
    changeTimeLine({ hours: timeStart[0], minutes: timeStart[1], type: 'start' });
  };
  const setEndTime = (e) => {
    const timeEnd = e.target.value.split(':');
    let newTime = start.split(':');
    const date = new Date();
    setEnd(e.target.value);
    if (+timeEnd[0] > +newTime[0] && +timeEnd[0] > +date.getHours()) {
      changeTimeLine({ hours: timeEnd[0], minutes: timeEnd[1], type: 'end' });
      setStatus('access');
    } else setStatus('error');
  };

  return (
    <form id='total-time'>
      <div id='start-container'>
        <h3 id='text-start'>START</h3>
        <input type='time' value={start} id='time-start' onChange={(e) => setStartTime(e)} required />
      </div>
      <div id='end-container'>
        <h3 id='text-end'>END</h3>
        <input
          type='time'
          value={end}
          className={timeStatus}
          id='time-end'
          onChange={(e) => setEndTime(e)}
          required
        />
      </div>
    </form>
  );
};

export default connect(
  'timeLine',
  actions
)(TotalTime);
