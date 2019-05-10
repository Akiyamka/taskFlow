import React, { useState, useEffect } from 'react';
import TimeStep from '../TimeStep';
import CurrentTime from '../CurrentTime';
import { connect } from 'unistore/react';
import * as C from '../../../data/const.js';
import './index.scss';

const TimeLine = ({ timeLine }) => {
  const timeArray = [];
  let timeInterval;
  const defineCurrentTimePosition = (currentTime, startTime) => {
    const hoursDifference = +currentTime[0] - +startTime[0];
    const timeDifference = +currentTime[1] - +startTime[1];
    return (
      hoursDifference * C.HOURS_DELAY +
      timeDifference * C.COEFFICIENT +
      hoursDifference * C.TIME_STEP_HEIGHT -
      C.CURRENT_TIME_HEIGHT
    );
  };

  useEffect(() => clearInterval(timeInterval))
  
  const [currentTime, setCurrentTime] = useState(new Date().getHours() + ':' + new Date().getMinutes());
  const updateTime = () => {
    setCurrentTime(new Date().getHours() + ':' + new Date().getMinutes());
    interval += 5;
  };

  const start = timeLine.start;
  const end = timeLine.end;

  const startTime = (C.MAX_MINUTES - +start[C.MINUTES]) * C.COEFFICIENT;
  const endTime = +end[C.MINUTES] * C.COEFFICIENT;

  let timeout = (C.MAX_MINUTES - new Date().getSeconds()) * C.ONE_SECONDS;

  let timeNow = currentTime.split(':');
  let interval = defineCurrentTimePosition(timeNow, start);

  if (start[C.MINUTES] !== C.ZERO_MINUTES)
    timeArray.push(
      <TimeStep key={start[C.HOURS]} type='time-line' marginTop={startTime + 'px'} time={+start[C.HOURS] + 1 + ':00'} />);
  else
    timeArray.push(
      <TimeStep key={start[C.HOURS]} type='time-line' marginTop='300px' time={+start[C.HOURS] + 1 + ':00'} />
    );

  for (let index = +start[C.HOURS] + 2; index < end[C.HOURS]; index++) {
    timeArray.push(<TimeStep key={index} marginTop='300px' type='time-line' time={index + ':00'} />);
  }

  if (end[C.MINUTES] !== C.ZERO_MINUTES)
    timeArray.push(
      <TimeStep key={end[C.HOURS]} marginTop='300px' marginBottom={endTime + 'px'} type='time-line' time={end[C.HOURS] + ':00'} />);
  else
    timeArray.push(
      <TimeStep key={end[C.HOURS]} marginTop='300px' type='time-line' time={end[C.HOURS] + ':00'} />
    );

  
  setTimeout(() => {
    updateTime();
    timeInterval = setInterval(() => updateTime(), C.ONE_MINUTES);
  }, timeout);

  return (
    <div id='time-board'>
      {timeArray}
      <CurrentTime marginTop={interval + 'px'} time={currentTime} />
    </div>
  );
};

export default connect('timeLine')(TimeLine);
