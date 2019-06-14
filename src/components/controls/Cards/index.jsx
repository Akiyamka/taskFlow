/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'unistore/react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import action from '../../../store/actions';
import Card from '../Card';
import './index.scss';

const Cards = ({ resize, resizeLastClick, tasks, changeTasks }) => {
  const dragEnd = ({ destination, source }) => {
    if (!destination) return;
    changeTasks({ oldIndex: source.index, newIndex: destination.index });
  };

  const resizeMove = (e) => {
    if (resize.isResize) {
      // eslint-disable-next-line no-param-reassign
      resize.ref.style.height = `${resize.height + (e.clientY - resize.positionY)}px`;
    }
  };

  const resizeEnd = () => resizeLastClick();

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <div id='cards-container' onMouseUp={resizeEnd} onMouseMove={resizeMove}>
        <Droppable droppableId='card-list-droppable'>
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
  );
};

export default connect(
  ['tasks', 'resize'],
  action
)(Cards);
