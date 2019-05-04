import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import './style.scss';

const Card = ({ data, changeTask, getTask }) => {
  const [status, setStatus] = useState(data.status ? 'Completed' : 'Done');
  const textContain = data.text ? 'text' : 'hidden';
  const getTaskData = () => getTask(data.id);
  const changeStatus = () => {
    setStatus('Completed');
    database.put({ ...data, status: true });
    changeTask({ id: data.id, status: true });
  };

  return (
    <div className='card'>
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
        <FontAwesomeIcon className={`check-icon-${status.toLocaleLowerCase()}`} icon='check' />
        <button className={`status-${status.toLocaleLowerCase()}`} onClick={changeStatus}>
          {status}
        </button>
      </div>
    </div>
  );
};

export default connect(
  'edit',
  action
)(Card);
