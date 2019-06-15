/* eslint-disable react/prop-types */
import React from 'react';
import uuid from 'uuid';
import { connect } from 'unistore/react';
import Frame from '../Frame';
import database from '../../../dataBase/db';
import actions from '../../../store/actions';

const FrameAdd = ({ addTask, lastIndex, lastIndexChange }) => (
  <Frame
    id={uuid()}
    frameTitle='Add task'
    buttonName='Cancel'
    status={false}
    name=''
    text=''
    backFunction={() => {}}
    buttonFunction={(arg) => {
      const index = lastIndex;
      lastIndexChange(lastIndex + 1);
      addTask({ ...arg, index });
      database.add({ ...arg, index });
    }}
  />
);

export default connect(
  'tasks, lastIndex',
  actions
)(FrameAdd);
