/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'unistore/react';
import Card from '../Card';
import './index.scss';

const Cards = ({ tasks }) => (
  <div id='cards-container'>
    {tasks.map(task => (
      <Card key={task.id} data={task} />
    ))}
  </div>
);

export default connect('tasks')(Cards);
