/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'unistore/react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import Card from '../Card';
import './index.scss';

const Cards = ({ resize, resizeLastClick, tasks, changeTask }) => {
  const dragEnd = ({ destination, source }) => {
    if (!destination) return;
    const newTask = tasks;
    const task = newTask.splice(source.index, 1);
    newTask.splice(destination.index, 0, ...task);
    newTask.map((task, index) => {
      changeTask({ id: task.id, index });
      database.put({ ...task, index });
    });
  };

  const resizeMove = (e) => {
    if (resize.isResize) {
      if (e.clientY) resize.ref.style.height = `${resize.height + (e.clientY - resize.positionY)}px`;
      else resize.ref.style.height = `${resize.height + (e.changedTouches[0].clientY - resize.positionY)}px`;
      resize.ref.className = resize.ref.className.replace(' flex-grow-cards', '');
    }
  };

  const resizeEnd = () => resizeLastClick();

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId='card-list-droppable'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            id='cards-container'
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
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default connect(
  ['tasks', 'resize'],
  action
)(Cards);
