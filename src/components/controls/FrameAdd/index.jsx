import React from 'react';
import uuid from 'uuid';
import { connect } from 'unistore/react';
import Frame from '../Frame';
import database from '../../../dataBase/db';
import actions from '../../../store/actions';
import './index.scss';

const FrameAdd = (props) => (
  <Frame
    id={uuid()}
    frameTitle='Add task'
    buttonName='Cancel'
    status={false}
    name=''
    text=''
    backFunction={() => {}}
    buttonFunction={(arg) => {
      props.addTask([arg]);
      database.add(arg);
    }}
  />
);

export default connect(
  'tasks',
  actions
)(FrameAdd);
