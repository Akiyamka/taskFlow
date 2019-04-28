import React from 'react';
import { connect } from 'unistore/react';
import Frame from '../Frame';
import database from '../../../dataBase/db';
import actions from '../../../store/actions';
import './index.scss';

const FrameEdit = (props) => {
  const id = props.match.params.id;
  return (
    <Frame
      id={id}
      frameTitle='Edit task'
      buttonName='Delete'
      status={props.edit.status}
      name={props.edit.name}
      text={props.edit.text}
      backFunction={(id) => {
        database.delete(id);
        props.deleteTask(id);
      }}
      buttonFunction={(arg) => {
        database.edit(arg);
        props.changeTask(arg);
      }}
    />
  );
};

export default connect(
  ['edit'],
  actions
)(FrameEdit);
