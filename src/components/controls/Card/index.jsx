import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import * as C from '../../../data/const';
import './style.scss';

const Card = ({ index, data, changeTask, getTask, tasks, draggedItem, changeSequence, addDraggedItem }) => {
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

  let newTasks = tasks;
  const DragStart = (e, index) => {
    addDraggedItem(newTasks[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
  };

  const DragOver = (index) => {
    const draggedOverItem = newTasks[index];
    if (draggedItem === draggedOverItem) return;

    newTasks = newTasks.filter((task) => task.id !== draggedItem.id);
    newTasks.splice(index, 0, draggedItem);
    
    newTasks.map((data,index) => {
      changeTask({ id: data.id, index });
    });
  };

  const DragEnd = () => {
    newTasks.map((data,index) => {
      database.put({ ...data, index });
      changeTask({ id: data.id, index });
    });
  };

  useEffect(() => {
    const height = parseInt(getComputedStyle(ref).height);
    const hours = Math.floor(height / C.COEFFICIENT / C.MAX_MINUTES);
    const minutes = Math.floor(height / C.COEFFICIENT - hours * C.MAX_MINUTES);
    if (hours) setTime(hours + 'h ' + minutes + 'min');
    else setTime(minutes + 'min');
  });

  return (
    <div ref={(node) => (ref = node)} className='card draggable' onDragOver={() => DragOver(index)}>
      <div onDragStart={(e) => DragStart(e, index)} draggable onDragEnd={() => DragEnd()}>
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
    </div>
  );
};

export default connect(
  ['tasks', 'draggedItem'],
  action
)(Card);
