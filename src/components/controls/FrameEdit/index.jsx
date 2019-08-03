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
        const collection = localStorage.getItem('id');
        firebase.delete(id, collection);
        deleteTask(id);
        tasks
          .sort((a, b) => a.index - b.index)
          .map((task, index) => {
            if (task.index !== index - 1) {
              firebase.put(task.id, { ...task, index }, collection);
              changeTask({ id: task.id, index });
            }
          });
      }}
      buttonFunction={(arg) => {
        const collection = localStorage.getItem('id');
        firebase.put(arg.id, arg, collection);
        changeTask(arg);
      }}
    />
  );
};

export default connect(
  'edit,tasks',
  actions
)(FrameEdit);
