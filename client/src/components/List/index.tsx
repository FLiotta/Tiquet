// Packages
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

// Project
import Task from '../Task';
import { TaskInterface } from '../../interfaces/Task';
import CreateTask from '../CreateTask';
import './styles.scss';

interface ListProps {
  id: number,
  title: string,
  tasks: TaskInterface[],
};

const List = ({ id, title, tasks }: ListProps): JSX.Element => {
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
        <Droppable droppableId={new Number(id).toString()} key={`${title}_${id}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyles()}
            >
              {tasks.map((task: TaskInterface, index: number) => (
                <Task key={task.uid} {...task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="list__footer">
        <CreateTask listId={id} />
      </div>
    </div>
  );
}

export default List;