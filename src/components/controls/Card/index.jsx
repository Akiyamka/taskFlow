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
import './style.scss';

const Card = ({ data, changeTask, getTask, coeff, oneMinutes, currentTimeInterval, id, index }) => {
  let ref;
  const [time, setTime] = useState('');
  const [isResize, setIsResize] = useState(false);
  const [status, setStatus] = useState(data.status ? 'Completed' : 'Done');
  const [performed, useperformed] = useState('card-no-performed');
  const textContain = data.text ? 'text' : 'hidden';

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
      useperformed('card-performed');
    else useperformed('card-no-performed');
  }, [currentTimeInterval]);

  const getRef = (node, provided) => {
    ref = node;
    provided.innerRef(ref)

  }
  let mousePosition = 0;
  const resizeStart = (e) => {
    mousePosition = e.clientY;
    setIsResize(true);
  }

  const resizeMove = (e) => {
    console.log( 300 + e.clientY- mousePosition + 'px')
    if (isResize)
      ref.style.height = 300 + e.clientY- mousePosition + 'px';
  }

  const resizeEnd = () => {
    setIsResize(false)
  }

  return (
    <Draggable draggableId={String(id)} isDragDisabled={isResize} index={index}>
      {(provided) => (
        <div  {...provided.draggableProps} ref={(node) => getRef(node, provided)} {...provided.dragHandleProps}>
          <div className={`card ${performed}`}>
            <div className='task-header'>
              <h2>{data.name}</h2>
              <Link to={`/edit/${data.id}`} onClick={getTaskData}>
                <div className='config'>
                  <FontAwesomeIcon className='config-icon' icon='pen' />
                </div>
              </Link>
            </div>
            <p className={`card-${textContain}`}>{data.text}</p>
            <div className='status-button'>
              <p className='time-duration'>{time}</p>
              <div>
                <FontAwesomeIcon className={`check-icon-${status.toLocaleLowerCase()}`} icon='check' />
                <button type='button' className={`status-${status.toLocaleLowerCase()}`} onClick={changeStatus}>
                  {status}
                </button>
              </div>
            </div>
          </div>
          <div className='card-resize-line' onMouseDown={resizeStart} onMouseUp={resizeEnd} onMouseMove={resizeMove} />
        </div>
      )}
    </Draggable >
  );
};

Card.defaultProps = {
  coeff: 4.5,
  oneMinutes: 60,
};

export default connect(
  'currentTimeInterval',
  action
)(Card);
