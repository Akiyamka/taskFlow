import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Frame = ({ name, text, id, status, index, frameTitle, buttonFunction, buttonName, backFunction }) => {
  const [newName, setName] = useState(name);
  const [newText, setText] = useState(text);

  const save = () => buttonFunction({ id, name: newName, text: newText, status, index });
  const remove = () => backFunction(id);

  return (
    <div id='frame'>
      <div id='frame-title'>
        <h3>{frameTitle}</h3>
      </div>

      <div id='frame-body'>
        <input
          id='input-title'
          onChange={(e) => setName(e.target.value)}
          defaultValue={newName}
          placeholder='Add title...'
        />

        <textarea
          id='input-text'
          onChange={(e) => setText(e.target.value)}
          defaultValue={newText}
          placeholder='Add text...'
        />

        <Link to='/'>
          <button id={buttonName.toLowerCase()} onClick={remove}>
            <h3>{buttonName}</h3>
          </button>

          <button id='save' onClick={save}>
            <h3>Save</h3>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Frame;
