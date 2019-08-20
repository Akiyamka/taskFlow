/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable no-new */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';
import action from '../../../store/actions';
import firebase from '../../../dataBase/firebase';
import db from '../../../dataBase/indexDb';
import st from './style.styl';

const Card = ({
  resize,
  data,
  resizeFirstClick,
  changeTask,
  getTask,
  coeff,
  oneMinutes,
  currentTimeInterval,
  index,
  taskInFocuse,
  notificationTask,
  remaining,
  growStatus,
}) => {
  let ref;
  const [time, setTime] = useState('');
  const [status, setStatus] = useState(data.status ? 'Completed' : 'Done');
  const [performed, usePerformed] = useState('cardNoPerformed');
  const textContain = data.text ? 'Text' : 'Hidden';

  const getTaskData = () => getTask(data.id);

  const changeStatus = () => {
    setStatus('Completed');

    const height = parseInt(getComputedStyle(ref).height);
    const collection = localStorage.getItem('id');

    if (ref.offsetTop < currentTimeInterval && currentTimeInterval < ref.offsetTop + height) {
      ref.style.height = `${currentTimeInterval - ref.offsetTop}px`;
    }
    firebase.put(data.id, { ...data, status: true, height: ref.style.height }, collection);
    db.put({ id: data.id, status: true, height: ref.style.height });
    changeTask({ id: data.id, status: true, height: ref.style.height });
  };

  useEffect(() => {
    const height = parseInt(getComputedStyle(ref).height);
    const hours = Math.floor(height / coeff / oneMinutes);
    const minutes = Math.floor(height / coeff - hours * oneMinutes);

    if (hours) setTime(`${hours}h ${minutes}min`);
    else setTime(`${minutes}min`);
  }, [resize]);

  useEffect(() => {
    const bottomLimit = ref.offsetTop + parseInt(getComputedStyle(ref).height);

    if (ref.offsetTop < currentTimeInterval && currentTimeInterval < bottomLimit) {
      usePerformed('cardPerformed');
      if (data.id !== notificationTask.id) taskInFocuse({ id: data.id, notification: true });

      if (bottomLimit - currentTimeInterval < remaining) {
        if (data.id === notificationTask.id && notificationTask.notification) {
          taskInFocuse({ id: data.id, notification: false });
          new Notification(`Ending time for the tusk - ${data.name}`, {
            icon: 'src/icon.png',
            body: `Remaining: ${Math.round((bottomLimit - currentTimeInterval) / 4.5)}min`,
            vibrate: [200, 100, 200],
            requireInteraction: false,
          });
        }
      }
    } else usePerformed('cardNoPerformed');
  }, [currentTimeInterval]);

  const resizeStart = (e) => {
    const resizeEvent = {
      height: parseInt(getComputedStyle(ref).height),
      id: data.id,
      isHeight: !!data.height,
      ref,
    };
    if (e.clientY) resizeEvent.positionY = e.clientY;
    else {
      resizeEvent.isTouch = true;
      resizeEvent.positionY = e.changedTouches[0].clientY;
    }

    resizeFirstClick(resizeEvent);
  };

  return (
    <Draggable draggableId={String(data.id)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={(node) => {
            provided.innerRef(node);
            ref = node;
          }}
          className={[st.card, st[performed], data.height ? '' : growStatus].join(' ')}
          style={{ ...provided.draggableProps.style, height: data.height }}
          {...provided.dragHandleProps}>
          <div className={st.taskHeader}>
            <h2>{data.name}</h2>
            <Link to={`/taskFlow/edit/${data.id}`} onClick={getTaskData}>
              <div className={st.config}>
                <FontAwesomeIcon className={st.configIcon} icon='pen' />
              </div>
            </Link>
          </div>

          <p className={st[`card${textContain}`]}>{data.text}</p>

          <div className={st.statusButton}>
            <p className={st.timeDuration}>{time}</p>
            <div>
              <FontAwesomeIcon className={st[`checkIcon${status}`]} icon='check' />
              <button type='button' className={st[`status${status}`]} onClick={changeStatus}>
                {status}
              </button>
            </div>
          </div>
          <button
            type='button'
            className={st.cardResizeLine}
            onMouseDown={resizeStart}
            onTouchStart={resizeStart}
          />
        </div>
      )}
    </Draggable>
  );
};

Card.defaultProps = {
  coeff: 4.5,
  oneMinutes: 60,
  remaining: 5 * 4.5,
};

export default connect(
  ['currentTimeInterval', 'resize', 'notificationTask'],
  action
)(Card);
