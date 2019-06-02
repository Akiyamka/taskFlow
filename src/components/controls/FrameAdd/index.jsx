/* eslint-disable react/prop-types */
import React from 'react';
import uuid from 'uuid';
import { connect } from 'unistore/react';
import Frame from '../Frame';
import database from '../../../dataBase/db';
import actions from '../../../store/actions';

const FrameAdd = ({ addTask }) => (
  <Frame
    id={uuid()}
    frameTitle='Add task'
    buttonName='Cancel'
    status={false}
    name=''
    text=''
    backFunction={() => {}}
    buttonFunction={arg => {
      addTask(arg);
      database.add(arg);
    }}
  />
);

export default connect(
  'tasks',
  actions
)(FrameAdd);
