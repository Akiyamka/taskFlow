/* eslint-disable react/prop-types */
import React from 'react';
import style from './style.styl';

const TimeStep = ({ time, height, visibility }) => (
  <div className={style.timeStep} style={{ visibility, height }}>
    <div className={style.textLine}>{time}</div>
    <div className={style.timeLine} />
  </div>
);

export default TimeStep;
