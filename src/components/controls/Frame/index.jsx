/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.styl';

const Frame = ({ name, text, id, status, frameTitle, buttonFunction, buttonName, backFunction }) => {
  const [newName, setName] = useState(name);
  const [newText, setText] = useState(text);

  const save = () => buttonFunction({ id, name: newName, text: newText, status });
  const remove = () => backFunction(id);

  return (
    <div className={style.frame}>
      <div className={style.frameTitle}>
        <h3>{frameTitle}</h3>
      </div>

      <div className={style.frameBody}>
        <input
          className={style.inputTitle}
          onChange={(e) => setName(e.target.value)}
          defaultValue={newName}
          placeholder='Add title...'
        />

        <textarea
          className={style.inputText}
          onChange={(e) => setText(e.target.value)}
          defaultValue={newText}
          placeholder='Add text...'
        />

        <div className={style.frameBottom}>
          <Link to='/taskFlow'>
            <button type='button' className={style[`btn${buttonName}`]} onClick={remove}>
              {buttonName}
            </button>

            <button type='button' className={style.btnSave} onClick={save}>
              Save
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Frame;
