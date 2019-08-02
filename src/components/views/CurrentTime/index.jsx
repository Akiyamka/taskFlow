/* eslint-disable react/prop-types */
import React from 'react';
import style from './style.styl';

const CurrentTime = ({ time, height }) => (
  <div style={{ height }} id={style.currentTime}>
    <div id={style.timeNow}>{time}</div>
    <div id={style.lineNow} />
  </div>
);

export default CurrentTime;
