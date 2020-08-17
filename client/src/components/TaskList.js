import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

import '../styles/components/List.scss';
const List = ({ title, tasks, id }) => {
  return (
    <div className="list">
      <h4 className="list__title">{title}</h4>
      <Droppable droppableId={toString(id)}>
        {provided => (
          <div innerRef={provided.innerRef}>
            {tasks.map((task, i) => <Task taskInfo={task} index={i} key={task.id} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default List;