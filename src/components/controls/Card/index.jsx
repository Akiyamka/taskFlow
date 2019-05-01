import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import './index.scss';

const Card = ({ data, changeTask, getTask }) => {
  const [status, setStatus] = useState(data.status ? 'Completed' : 'Done');
  const getTaskData = () => getTask(data.id);
  const changeStatus = () => {
    setStatus('Completed');
    database.put({ ...data, status: true });
    changeTask({ ...data, status: true });
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
      <p>{data.text}</p>
      <button className={`status-${status.toLocaleLowerCase()}`} onClick={changeStatus}>
        {status}
      </button>
    </div>
  );
};

export default connect(
  'edit',
  action
)(Card);
