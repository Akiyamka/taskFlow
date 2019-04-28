import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Frame = (props) => {
  const [name, setName] = useState(props.name);
  const [text, setText] = useState(props.text);

  const save = () => {
    props.buttonFunction({
      id: props.id,
      name: name,
      text: text,
      status: props.status,
    });
  };
  const del = () => {
    props.backFunction(props.id);
  };

  return (
    <div id='frame'>
      <div id='frame-title'>
        <h3>{props.frameTitle}</h3>
      </div>

      <div id='frame-body'>
        <input
          id='input-title'
          onChange={(e) => setName(e.target.value)}
          defaultValue={name}
          placeholder='Add title...'
        />

        <textarea
          id='input-text'
          onChange={(e) => setText(e.target.value)}
          defaultValue={text}
          placeholder='Add text...'
        />

        <Link to='/'>
          <button id={props.buttonName.toLowerCase()} onClick={del}>
            <h3>{props.buttonName}</h3>
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
