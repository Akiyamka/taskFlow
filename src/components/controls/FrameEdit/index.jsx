/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'unistore/react';
import Frame from '../Frame';
import firebase from '../../../dataBase/firebase';
import actions from '../../../store/actions';

const FrameEdit = ({ edit, deleteTask, changeTask, match, tasks }) => {
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
        firebase.delete(id)
        deleteTask(id);
        tasks
          .sort((a, b) => a.index - b.index)
          .map((task, index) => {
            if (task.index !== index - 1) {
              firebase.put(task.id, { ...task, index });
              changeTask({ id: task.id, index });
            }
          });
      }}
      buttonFunction={(arg) => {
        firebase.put(arg.id, arg);
        changeTask(arg);
      }}
    />
  );
};

export default connect(
  'edit,tasks',
  actions
)(FrameEdit);
