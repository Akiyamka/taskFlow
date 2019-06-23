import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import style from './style.styl';

const AddTask = () => (
  <Link to='/add'>
    <button type='button' id={style.addButton}>
      <div id={style.textButton}>
        <FontAwesomeIcon id={style.iconPlus} icon='plus' />
        <h2>ADD TASK</h2>
      </div>
    </button>
  </Link>
);

export default AddTask;
