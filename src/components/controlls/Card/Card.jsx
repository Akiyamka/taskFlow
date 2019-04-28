import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import './Card.scss';

const Card = (props) => {
  const getTaskData = () => {
    props.getTask(props.id);
  };
  const changeStatus = () => {
    status = 'Completed';
    database.edit({ id: props.id, name: props.name, text: props.text, status: true });
    props.changeTask({ id: props.id, name: props.name, text: props.text, status: true });
  };
  let status;
  if (props.status) status = 'Completed';
  else status = 'Done';

  return (
    <div className='card'>
      <div className='task-header'>
        <h2>{props.name}</h2>
        <Link to={'/edit/' + props.id} onClick={getTaskData}>
          <div className='config'>
            <FontAwesomeIcon className='config-icon' icon='pen' />
          </div>
        </Link>
      </div>
      <p>{props.text}</p>
      <button className={'status-' + status.toLocaleLowerCase()} onClick={changeStatus}>
        {status}
      </button>
    </div>
  );
};

export default connect(
  'edit',
  action
)(Card);
