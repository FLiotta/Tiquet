// Packages
import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import cn from 'classnames';

// Project
import Task from '../Task';
import CreateTask from '../CreateTask';
import './styles.scss';

const List = ({ id, title, tasks, className }) => {
  return (
    <div className="list">
      <h6 className="list__title">{title.toUpperCase()}</h6>
      <hr />
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
      <CreateTask listId={id} />
    </div>
  )
}

List.propTypes = {
  id: propTypes.number,
  title: propTypes.string,
  tasks: propTypes.array,
  className: propTypes.string,
};

export default List;