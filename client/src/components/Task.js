// @Packages
import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

// @Project
import '../styles/components/TaskCard.scss';

const Task = ({ className, taskInfo, index }) => (
  <Draggable draggableId={toString(taskInfo.id)} index={index}>
    {(provided) => (
      <div 
        className={cn('taskcard', className)} 
        {...provided.draggableProps} 
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
        <h2 className="taskcard__title">{taskInfo.title}</h2>
      </div>
    )}
  </Draggable>
)

Task.propTypes = {
  className: propTypes.string,
  taskInfo: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
  }).isRequired,
}

export default Task;