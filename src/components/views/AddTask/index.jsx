import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import style from './style.styl';

const AddTask = () => (
  <Link to='/taskFlow/add'>
    <button type='button' className={style.addButton}>
      <div className={style.textButton}>
        <FontAwesomeIcon className={style.iconPlus} icon='plus' />
        <h2>ADD TASK</h2>
      </div>
    </button>
  </Link>
);

export default AddTask;
