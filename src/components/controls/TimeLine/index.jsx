import React, { useState, useEffect } from 'react';
import TimeStep from '../../views/TimeStep';
import CurrentTime from '../../views/CurrentTime';
import { connect } from 'unistore/react';
import * as C from '../../../data/const.js';
import './index.scss';

const TimeLine = ({ timeLine, coeff, oneMinutes, milliSeconds, minuteInMill }) => {
  const timeArray = [];
  let timeInterval;

  const start = timeLine.start;
  const end = timeLine.end;

  const startTime = (oneMinutes - new Date(start).getMinutes()) * coeff;
  const endTime = new Date(end).getMinutes() * coeff;

  let timeout = (oneMinutes - new Date().getSeconds()) * milliSeconds;

  const defineCurrentTimePosition = (timeNow, start) => ((timeNow - start) / minuteInMill) * coeff + 16;

  const getTime = () => new Date().getHours() + ':' + new Date().getMinutes();

  const [currentTime, setCurrentTime] = useState(getTime());

  let interval = defineCurrentTimePosition(new Date().getTime(), start);

  const updateTime = () => {
    setCurrentTime(getTime());
    interval += 5;
  };

  if (startTime) timeArray.push(<TimeStep key={start} height={startTime + 'px'} visibility={'hidden'} />);
  else timeArray.push(<TimeStep key={start} visibility={'hidden'} />);

  for (let index = new Date(start).getHours() + 1; index < new Date(end).getHours(); index++)
    timeArray.push(<TimeStep key={index} time={index + ':00'} />);

  if (endTime)
    timeArray.push(<TimeStep key={end} height={endTime + 'px'} time={new Date(end).getHours() + ':00'} />);
  else timeArray.push(<TimeStep key={end} time={new Date(end).getHours() + ':00'} />);

  useEffect(() => clearInterval(timeInterval));

  setTimeout(() => {
    updateTime();
    timeInterval = setInterval(() => updateTime(), C.ONE_MINUTES);
  }, timeout);

  return (
    <div id='time-board'>
      {timeArray}
      <CurrentTime height={interval + 'px'} time={currentTime} />
    </div>
  );
};

TimeLine.defaultProps = {
  coeff: 5,
  oneMinutes: 60,
  milliSeconds: 1000,
  minuteInMill: 60000,
};

export default connect('timeLine')(TimeLine);
