import React from 'react';
import { connect } from 'unistore/react';
import Card from '../Card';
import './index.scss';

const Cards = ({ tasks }) => {
  let newArr = tasks;
  return (
    <div id='cards-container'>
      {newArr
        .sort((a, b) => a.index - b.index)
        .map((task) => {
          return <Card key={task.id} data={task} index={task.index} />;
        })}
    </div>
  );
};

export default connect('tasks')(Cards);
