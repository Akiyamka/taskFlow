/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'unistore/react';
import actions from '../../../store/actions';
import style from './style.styl';

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

  const setStartTime = (e) => {
    const timeStart = new Date().setHours(...e.target.value.split(':'));
    const startTimeLaterThanCurrent = timeStart < DateNow;

    setStart(e.target.value);
    localStorage.setItem('startTime', e.target.value);

    if (startTimeLaterThanCurrent) {
      changeTimeLine({ time: timeStart, type: 'start' });
      setStatusStart('access');
    } else setStatusStart('error');
  };

  const setEndTime = (e) => {
    const timeEnd = new Date().setHours(...e.target.value.split(':'));

    const finalTimeMoreThanStartTime = timeEnd > timeLine.start;
    const finalTimeMoreThanCurrentTime = timeEnd > DateNow;

    setEnd(e.target.value);
    localStorage.setItem('endTime', e.target.value);
    
    if (finalTimeMoreThanStartTime && finalTimeMoreThanCurrentTime) {
      changeTimeLine({ time: timeEnd, type: 'end' });
      setStatusEnd('access');
    } else setStatusEnd('error');
  };


  return (
    <form className={style.totalTime}>
      <div className={style.startContainer}>
        <h3 className={style.textStart}>START</h3>
        <input
          className={[style.timeStart, style[timeStatusStart]].join(' ')}
          type='time'
          value={start}
          onChange={(e) => setStartTime(e)}
          required
        />
      </div>
      <div className={style.endContainer}>
        <h3 className={style.textEnd}>END</h3>
        <input
          type='time'
          value={end}
          className={[style.timeEnd, style[timeStatusEnd]].join(' ')}
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
