import React from 'react';
import { connect } from 'unistore/react';
import Card from '../Card';
import './index.scss';

const Cards = ({ tasks }) => {
  return tasks.map((task) => <Card key={task.id} data={task} />);
};

export default connect('tasks')(Cards);
