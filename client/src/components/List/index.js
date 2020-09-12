// Packages
import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

// Project
import Task from '../Task';
import CreateTask from '../CreateTask';
import './styles.scss';

const List = ({ id, title, tasks }) => {
  const getListStyles = () => ({
    width: '100%',
    minHeight: 5,
    maxHeight: 350,
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  });

  return (
    <div className="list">
      <div className="list__header">
        <h6 className="list__header-title">{title.toUpperCase()}</h6>
      </div>
      <div className="list__body">
        <Droppable droppableId={new Number(id).toString()} key={title}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyles()}
            >
              {tasks.map((task, index) => <Task key={task.uid} {...task} index={index} />)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="list__footer">
        <CreateTask listId={id} />
      </div>
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