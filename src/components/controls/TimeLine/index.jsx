import React, { useState, useEffect } from 'react';
import TimeStep from '../../views/TimeStep';
import CurrentTime from '../../views/CurrentTime';
import { connect } from 'unistore/react';
import * as C from '../../../data/const.js';
import './index.scss';

const TimeLine = ({ timeLine }) => {
  const timeArray = [];
  let timeInterval;

  const start = timeLine.start;
  const end = timeLine.end;

  const startTime = (C.MAX_MINUTES - +start[C.MINUTES]) * C.COEFFICIENT; //Определение минут и перевод их в пиксели
  const endTime = +end[C.MINUTES] * C.COEFFICIENT;

  let timeout = (C.MAX_MINUTES - new Date().getSeconds()) * C.ONE_SECONDS;

  const defineCurrentTimePosition = (currentTime, startTime) => { //функция для определения позиции текущего времени
    const hoursDifference = +currentTime[0] - +startTime[0];
    const minutesDifference = +currentTime[1] - +startTime[1];
    return (
      hoursDifference * C.HOURS_DELAY + //сдвиг по часам 
      minutesDifference * C.COEFFICIENT + //свдвиг по минутам
      hoursDifference * C.TIME_STEP_HEIGHT - //сдиг по величине временных полосок
      C.CURRENT_TIME_HEIGHT //свиг по величине полоски (Time Now)
    );
  };
  const getTime = () => new Date().getHours() + ':' + new Date().getMinutes(); // Текущее время

  const [currentTime, setCurrentTime] = useState(getTime()); //Текущее время
  let timeNow = currentTime.split(':');

  let interval = defineCurrentTimePosition(timeNow, start);

  const updateTime = () => { //Обновление текущего времени (вначале через n-секунд, а потом каждую минуту)
    setCurrentTime(getTime());
    interval += 5;
  };

  if (start[C.MINUTES] !== C.ZERO_MINUTES) //первая полоска времени (отступ в зависимости от минут)
    timeArray.push(<TimeStep key={start[C.HOURS]} marginTop={startTime + 'px'} time={+start[C.HOURS] + 1 + ':00'} />);
  else timeArray.push(<TimeStep key={start[C.HOURS]} time={+start[C.HOURS] + 1 + ':00'} />);

  for (let index = +start[C.HOURS] + 2; index < end[C.HOURS]; index++) { //Остальные полоски времени (отступ 300px)
    timeArray.push(<TimeStep key={index} time={index + ':00'} />);
  }

  if (end[C.MINUTES] !== C.ZERO_MINUTES)//последняя полоска времени (отступ в зависимости от минут)
    timeArray.push(<TimeStep key={end[C.HOURS]} marginBottom={endTime + 'px'} time={end[C.HOURS] + ':00'} />);
  else timeArray.push(<TimeStep key={end[C.HOURS]} time={end[C.HOURS] + ':00'} />);

  useEffect(() => clearInterval(timeInterval)); //очистка таймера

  setTimeout(() => { //таймер для Time Now 
    updateTime();
    timeInterval = setInterval(() => updateTime(), C.ONE_MINUTES);
  }, timeout);

  let timeForComponent = currentTime;
  if (+timeNow[1] < 10) timeForComponent = timeNow[0] + ':0' + timeNow[1];

  return (
    <div id='time-board'>
      {timeArray}
      <CurrentTime marginTop={interval + 'px'} time={timeForComponent} />
    </div>
  );
};

export default connect('timeLine')(TimeLine);
