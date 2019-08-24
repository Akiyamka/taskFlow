import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import style from './style.styl';

const path = process.env.NODE_ENV === 'production';

const AddTask = () => (
  <Link to={path ? '/taskFlow/add' : '/add'}>
    <button type='button' className={style.addButton}>
      <div className={style.textButton}>
        <FontAwesomeIcon className={style.iconPlus} icon='plus' />
        <h2>ADD TASK</h2>
      </div>
    </button>
  </Link>
);

export default AddTask;
