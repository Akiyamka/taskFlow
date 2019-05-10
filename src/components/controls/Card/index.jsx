import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import * as C from '../../../data/const';
import './style.scss';

const Card = ({ data, changeTask, getTask }) => {
  let ref;
  const [time, setTime] = useState('');
  const [status, setStatus] = useState(data.status ? 'Completed' : 'Done');
  const textContain = data.text ? 'text' : 'hidden';
  const getTaskData = () => getTask(data.id);
  const changeStatus = () => {
    setStatus('Completed');
    database.put({ ...data, status: true });
    changeTask({ id: data.id, status: true });
  };

  useEffect(() => {
    const height = parseInt(getComputedStyle(ref).height);
    const hours = Math.floor(height / C.COEFFICIENT / C.MAX_MINUTES);
    const minutes = Math.floor(height / C.COEFFICIENT - hours * C.MAX_MINUTES);
    if (hours) setTime(hours + 'h ' + minutes + 'min');
    else setTime(minutes + 'min');
  });

  return (
    <div ref={(node) => (ref = node)} className='card'>
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
          <button className={`status-${status.toLocaleLowerCase()}`} onClick={changeStatus}>
            {status}
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  'edit',
  action
)(Card);
