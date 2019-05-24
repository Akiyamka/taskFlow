import React, { useState, useEffect } from 'react';
import { connect } from 'unistore/react';
import TimeStep from '../../views/TimeStep';
import CurrentTime from '../../views/CurrentTime';
import actions from '../../../store/actions';
import './index.scss';

const TimeLine = ({ timeLine, coeff, oneMinutes, minuteInMill, digit, milliseconds, saveCurrentTimeInterval }) => {
  const timeTape = [];
  let timeInterval;

  const start = timeLine.start;
  const end = timeLine.end;

  const startMinutes = (oneMinutes - new Date(start).getMinutes()) * coeff;
  const endMinutes = new Date(end).getMinutes() * coeff;

  const timeout = minuteInMill - new Date().getSeconds() * milliseconds;

  const defineCurrentTimePosition = (timeNow, start) => ((timeNow - start) / minuteInMill) * coeff;
  const getTime = () => {
    const minutes = new Date().getMinutes();
    const currentMinutes = minutes > digit ? minutes : '0' + minutes;
    return new Date().getHours() + ':' + currentMinutes;
  };

  let interval = defineCurrentTimePosition(new Date().getTime(), start);
  saveCurrentTimeInterval(interval)
  
  const [currentTime, setCurrentTime] = useState(getTime());
  const hourseEnd = new Date(end).getHours();
  const hourseStart = new Date(start).getHours();

  const updateTime = () => {
    setCurrentTime(getTime());
    interval += 5;
    saveCurrentTimeInterval(interval)
  };

  if (startMinutes)
    timeTape.push(<TimeStep key={start} height={startMinutes + 'px'} visibility={'hidden'} />);
  else timeTape.push(<TimeStep key={start} visibility={'hidden'} />);

  for (let index = hourseStart + 1; index < hourseEnd; index++)
    timeTape.push(<TimeStep key={index} time={index + ':00'} />);

  if (endMinutes && hourseStart === hourseEnd)
    timeTape.push(<TimeStep key={end} height={endMinutes + 'px'} time={hourseEnd + 1 + ':00'} />);
  else if (endMinutes)
    timeTape.push(<TimeStep key={end} height={endMinutes + 'px'} time={hourseEnd + ':00'} />);
  else timeTape.push(<TimeStep key={end} time={hourseEnd + ':00'} />);

  useEffect(() => clearInterval(timeInterval));

  setTimeout(() => {
    updateTime();
    timeInterval = setInterval(() => updateTime(), minuteInMill);
  }, timeout);

  return (
    <div id='time-board'>
      {timeTape}
      <CurrentTime height={interval + 'px'} time={currentTime} />
    </div>
  );
};

TimeLine.defaultProps = {
  coeff: 5,
  digit: 9,
  oneMinutes: 60,
  minuteInMill: 60000,
  milliseconds: 1000,
};

export default connect(
  'timeLine',
  actions
)(TimeLine);
