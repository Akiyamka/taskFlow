/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'unistore/react';
import TimeStep from '../../views/TimeStep';
import CurrentTime from '../../views/CurrentTime';
import actions from '../../../store/actions';
import style from './style.styl';

const TimeLine = ({
  saveCurrentTimeInterval,
  timeLine,
  PIXELS_IN_MINUTE,
  ONE_MINUTE,
  ONE_HOUR,
  ONE_SECOND,
}) => {
  function getTimeHeight(timestamp) {
    return (timestamp / ONE_MINUTE) * PIXELS_IN_MINUTE;
  }

  function getMinutes(timestamp) {
    const date = new Date(timestamp);
    return date.getMinutes() * ONE_MINUTE;
  }

  function getCorrectTime(timestamp) {
    const date = new Date(timestamp);
    return `${date.getHours()}:00`;
  }

  function currentTimeGenerator(start) {
    const date = new Date();
    let [hours, minutes] = [date.getHours(), date.getMinutes()];
    minutes = minutes / 10 >= 1 ? minutes : `0${minutes}`;
    const time = `${hours}:${minutes}`;

    hours -= new Date(start).getHours();
    minutes -= new Date(start).getMinutes();
    const height = getTimeHeight(hours * ONE_HOUR + minutes * ONE_MINUTE);
    return { height, time };
  }

  // eslint-disable-next-line no-shadow
  function heightsGenerator(start, end) {
    if (!Number.isInteger(start)) start = start.getTime();
    if (!Number.isInteger(end)) end = end.getTime();

    const heights = [];

    const firstTime = ONE_HOUR - getMinutes(start);
    heights.push({
      height: getTimeHeight(firstTime),
      date: getCorrectTime(start),
      visible: 'hidden',
    });

    start += firstTime;
    while (start < end - ONE_HOUR) {
      heights.push({
        height: getTimeHeight(ONE_HOUR),
        date: getCorrectTime(start),
      });

      start += ONE_HOUR;
    }

    const lastTime = getMinutes(end);
    heights.push({
      height: getTimeHeight(lastTime),
      date: getCorrectTime(end),
    });

    return heights;
  }

  let { start, end } = timeLine;
  const timeout = ONE_MINUTE - new Date().getSeconds() * ONE_SECOND;
  const [currentTime, useCurrentTime] = useState(currentTimeGenerator(start));
  
  if( start > new Date().getTime() ) start = new Date().getTime();  
  if( end < new Date().getTime() ) end = new Date().getTime();
  
  const massHeight = heightsGenerator(start, end);

  const timeTape = [];
  massHeight.map((value, index) =>
    timeTape.push(
      // eslint-disable-next-line react/no-array-index-key
      <TimeStep key={index} height={`${value.height}px`} time={`${value.date}`} visibility={value.visible} />
    )
  );


  useEffect(() => {
    saveCurrentTimeInterval(currentTime.height);
  });

  useEffect(() => {
    useCurrentTime(currentTimeGenerator(start));
  }, [timeLine]);

  useEffect(() => {
    const timeInterval = setTimeout(() => {
      useCurrentTime(currentTimeGenerator(start));
    }, timeout);

    return () => clearInterval(timeInterval);
  });

  return (
    <div className={style.timeBoard}>
      {timeTape}
      <CurrentTime height={`${currentTime.height}px`} time={`${currentTime.time}`} />
    </div>
  );
};

TimeLine.defaultProps = {
  PIXELS_IN_MINUTE: 4.5,
  ONE_MINUTE: 60000,
  ONE_HOUR: 3600000,
  ONE_SECOND: 1000,
};

export default connect(
  'timeLine',
  actions
)(TimeLine);
