// @Packages
import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import cn from 'classnames';

// @Project
import Task from './Task';
import '../styles/components/List.scss';

const List = ({ id, title, tasks, className}) => {
  return (
    <div className="list">
      <h5 className="list__title">{title}</h5>
      <Droppable droppableId={new Number(id).toString()} key={title}>
        {(provided) => (
          <Fragment>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cn("list__column", className)}>
              {tasks.map((task, index) => <Task key={task.uid} {...task} index={index} />)}
            </div>
            {provided.placeholder}
          </Fragment>
        )}
      </Droppable>
    </div>
  )
}

List.propTypes = {
  id: propTypes.number,
  title: propTypes.number,
  tasks: propTypes.array,
  className: propTypes.string,
};

export default List;