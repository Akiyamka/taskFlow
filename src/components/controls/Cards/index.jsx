/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'unistore/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import action from '../../../store/actions';
import Card from '../Card';
import './index.scss';

const Cards = ({ tasks, changeTasks }) => {
  const dragEnd = ({ destination, source }) => {
    if (!destination) return;
    changeTasks({ oldIndex: source.index, newIndex: destination.index })
  }
  return (
    <DragDropContext onDragEnd={dragEnd}>
      <div id='cards-container'>
        <Droppable droppableId={'card-list-droppable'}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Card data={task} key={task.id} id={task.id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default connect('tasks', action)(Cards);
