/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'unistore/react';
import actions from '../../../store/actions';
import './index.scss';

function unixTimeTo24(unixTime) {
  return new Date(unixTime)
    .toString()
    .split('2019')[1]
    .split('GMT')[0]
    .trim();
}

const TotalTime = ({ changeTimeLine, timeLine }) => {
  const [start, setStart] = useState(unixTimeTo24(timeLine.start));
  const [end, setEnd] = useState(unixTimeTo24(timeLine.end));
  const [timeStatusStart, setStatusStart] = useState('access');
  const [timeStatusEnd, setStatusEnd] = useState('access');
  const DateNow = new Date();

  const setStartTime = e => {
    const timeStart = new Date().setHours(...e.target.value.split(':'));
    const startTimeLaterThanCurrent = timeStart < DateNow;

    setStart(e.target.value);
    if (startTimeLaterThanCurrent) {
      changeTimeLine({ time: timeStart, type: 'start' });
      setStatusStart('access');
    } else setStatusStart('error');
  };

  const setEndTime = e => {
    const timeEnd = new Date().setHours(...e.target.value.split(':'));

    const finalTimeMoreThanStartTime = timeEnd > timeLine.start;
    const finalTimeMoreThanCurrentTime = timeEnd > DateNow;
    setEnd(e.target.value);
    if (finalTimeMoreThanStartTime && finalTimeMoreThanCurrentTime) {
      changeTimeLine({ time: timeEnd, type: 'end' });
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
          onChange={e => setStartTime(e)}
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
          onChange={e => setEndTime(e)}
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
