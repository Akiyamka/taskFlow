import React, { useState } from 'react';
import { connect } from 'unistore/react';
import actions from '../../../store/actions';
import './index.scss';

const TotalTime = ({ changeTimeLine }) => {
  const [start, setStart] = useState('00:00');
  const [end, setEnd] = useState('23:59');
  const [timeStatusStart, setStatusStart] = useState('access');
  const [timeStatusEnd, setStatusEnd] = useState('access');
  const DateNow = new Date();
  const setStartTime = (e) => {
    const timeStart = e.target.value.split(':');
    setStart(e.target.value);
    if (
      +timeStart[0] < DateNow.getHours() ||
      (+timeStart[0] === DateNow.getHours() && DateNow.getMinutes() > 0)
    ) {
      changeTimeLine({ hours: timeStart[0], minutes: timeStart[1], type: 'start' });
      setStatusStart('access');
    } else setStatusStart('error');
  };
  const setEndTime = (e) => {
    const timeEnd = e.target.value.split(':');
    let newTime = start.split(':');
    setEnd(e.target.value);
    if (+timeEnd[0] > +newTime[0] && +timeEnd[0] > DateNow.getHours()) {
      changeTimeLine({ hours: timeEnd[0], minutes: timeEnd[1], type: 'end' });
      setStatusEnd('access');
    } else setStatusEnd('error');
  };

  return (
    <form id='total-time'>
      <div id='start-container'>
        <h3 id='text-start'>START</h3>
        <input
          id='time-start'
          type='time'
          value={start}
          className={timeStatusStart}
          onChange={(e) => setStartTime(e)}
          required
        />
      </div>
      <div id='end-container'>
        <h3 id='text-end'>END</h3>
        <input
          id='time-end'
          type='time'
          value={end}
          className={timeStatusEnd}
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
