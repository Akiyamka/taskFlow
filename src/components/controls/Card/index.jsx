/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import style from './style.styl';

const Card = ({
  resize,
  data,
  resizeFirstClick,
  changeTask,
  getTask,
  coeff,
  oneMinutes,
  currentTimeInterval,
  id,
  index,
}) => {
  let ref;
  const [time, setTime] = useState('');
  const [status, setStatus] = useState(data.status ? 'Completed' : 'Done');
  const [performed, useperformed] = useState('cardNoPerformed');
  const textContain = data.text ? 'Text' : 'Hidden';

  const getTaskData = () => getTask(data.id);
  const changeStatus = () => {
    setStatus('Completed');
    database.put({ ...data, status: true });
    changeTask({ id: data.id, status: true });
  };

  useEffect(() => {
    const height = parseInt(getComputedStyle(ref).height);
    const hours = Math.floor(height / coeff / oneMinutes);
    const minutes = Math.floor(height / coeff - hours * oneMinutes);
    if (hours) setTime(`${hours}h ${minutes}min`);
    else setTime(`${minutes}min`);

    if (ref.offsetTop < currentTimeInterval && currentTimeInterval < ref.offsetTop + height)
      useperformed('cardPerformed');
    else useperformed('cardNoPerformed');
  }, [currentTimeInterval, resize]);

  const resizeStart = (e) => {
    const resizeEvent = {
      height: parseInt(getComputedStyle(ref).height),
      ref,
    };
    if (e.clientY) resizeEvent.positionY = e.clientY;
    else resizeEvent.positionY = e.changedTouches[0].clientY;

    resizeFirstClick(resizeEvent);
  };

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
          <div ref={(node) => (ref = node)} className={[style.card, style[performed]].join(' ')}>
            <div className={style.taskHeader}>
              <h2>{data.name}</h2>
              <Link to={`/edit/${data.id}`} onClick={getTaskData}>
                <div className={style.config}>
                  <FontAwesomeIcon className={style.configIcon} icon='pen' />
                </div>
              </Link>
            </div>

            <p className={style[`card${textContain}`]}>{data.text}</p>

            <div className={style.statusButton}>
              <p className={style.timeDuration}>{time}</p>
              <div>
                <FontAwesomeIcon className={style[`checkIcon${status}`]} icon='check' />
                <button
                  type='button'
                  className={style[`status${status}`]}
                  onClick={changeStatus}>
                  {status}
                </button>
              </div>
            </div>
            <button
              type='button'
              className={style.cardResizeLine}
              onMouseDown={resizeStart}
              onTouchStart={resizeStart}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

Card.defaultProps = {
  coeff: 4.5,
  oneMinutes: 60,
};

export default connect(
  ['currentTimeInterval', 'resize'],
  action
)(Card);
