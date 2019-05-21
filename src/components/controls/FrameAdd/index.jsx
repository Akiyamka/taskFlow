import React from 'react';
import { connect } from 'unistore/react';
import uuid from 'uuid';
import Frame from '../Frame';
import database from '../../../dataBase/db';
import actions from '../../../store/actions';

const FrameAdd = ({ addTask, maxIndex }) => (
  <Frame
    id={uuid()}
    frameTitle='Add task'
    buttonName='Cancel'
    status={false}
    index={maxIndex + 1}
    name=''
    text=''
    backFunction={() => {}}
    buttonFunction={(arg) => {
      addTask(arg);
      database.add(arg);
    }}
  />
);

export default connect(
  'maxIndex',
  actions
)(FrameAdd);
