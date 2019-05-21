import React from 'react';
import { connect } from 'unistore/react';
import Frame from '../Frame';
import database from '../../../dataBase/db';
import actions from '../../../store/actions';

const FrameEdit = ({ edit, deleteTask, changeTask, match }) => {
  const { id } = match.params;
  return (
    <Frame
      id={id}
      frameTitle='Edit task'
      buttonName='Delete'
      status={edit.status}
      name={edit.name}
      text={edit.text}
      backFunction={(id) => {
        database.delete(id);
        deleteTask(id);
      }}
      buttonFunction={(arg) => {
        database.put(arg);
        changeTask(arg);
      }}
    />
  );
};

export default connect(
  'edit',
  actions
)(FrameEdit);
