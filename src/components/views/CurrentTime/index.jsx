/* eslint-disable react/prop-types */
import React from 'react';
import style from './style.styl';

const CurrentTime = ({ time, height }) => (
  <div style={{ height }} className={style.currentTime}>
    <div className={style.timeNow}>{time}</div>
    <div className={style.lineNow} />
  </div>
);

export default CurrentTime;
