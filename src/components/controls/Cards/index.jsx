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
import style from './index.styl';

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
    }
  };

  const resizeEnd = () => resizeLastClick();

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <div
        id={style.cardsContainer}
        onMouseUp={resizeEnd}
        onMouseMove={resizeMove}
        onTouchMove={resizeMove}
        onTouchEnd={resizeEnd}>
        <Droppable droppableId='cardListDroppable'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks
                .sort((a, b) => a.index - b.index)
                .map((task, index) => (
                  <Card data={task} key={task.id} id={task.id} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default connect(
  ['tasks', 'resize'],
  action
)(Cards);
