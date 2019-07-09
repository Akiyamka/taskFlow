/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'unistore/react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import action from '../../../store/actions';
import firebase from '../../../dataBase/firebase';
import Card from '../Card';
import style from './index.styl';

const Cards = ({ resize, resizeLastClick, tasks, changeTask }) => {
  const dragEnd = ({ destination, source }) => {
    if (!destination) return;
    const newTask = tasks;
    const task = newTask.splice(source.index, 1);
    newTask.splice(destination.index, 0, ...task);
    newTask.map((task, index) => {
      changeTask({ id: task.id, index });
      firebase.put(task.id, { ...task, index });
    });
  };

  const resizeMove = (e) => {
    if (resize.isResize) {
      if (!resize.height) resize.ref.className = resize.ref.className.replace(' flexGrowCards', '');
      if (e.clientY) resize.ref.style.height = `${resize.height + (e.clientY - resize.positionY)}px`;
      else resize.ref.style.height = `${resize.height + (e.changedTouches[0].clientY - resize.positionY)}px`;
    }
  };

  const resizeEnd = () => {
    if (resize.isResize) {
      resizeLastClick();
      const index = tasks.findIndex((task) => resize.id === task.id);
      changeTask({ id: resize.id, height: resize.ref.style.height });
      firebase.put(resize.id, { ...tasks[index], height: resize.ref.style.height }).catch(console.log);
    }
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId='cardListDroppable'>
        {(provided) => {
          const st = resize.isTouch;
          return (
            <div
              {...provided.droppableProps}
              className={st ? style.mobile : style.pc}
              ref={provided.innerRef}
              id={style.cardsContainer}
              onMouseUp={resizeEnd}
              onMouseMove={resizeMove}
              onTouchMove={resizeMove}
              onTouchEnd={resizeEnd}>
              {tasks
                .sort((a, b) => a.index - b.index)
                .map((task, index) => (
                  <Card data={task} key={task.id} id={task.id} index={index} growStatus={task.growStatus} />
                ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default connect(
  ['tasks', 'resize'],
  action
)(Cards);
