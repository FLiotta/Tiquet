// Packages
import React from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

// Project
import { selectTaskInfoLoading, selectTaskInfoId } from '../../selectors/taskDescription';
import { fetchTask } from '../../actions/taskDescription';
import { deleteTask } from '../../actions/board';
import './styles.scss';

export const Task = ({ title, handleDeleteTask, handleInfoClick }) => (
  <div className="task">
    <div>
      <p className="task__title">{title}</p>
    </div>
    <div className="task__body">
      <div className="task__body-priority">
        <div className="task__body-priority__bubble"></div>
        <span className="task__body-priority__value">High priority</span>
      </div>
      <div className="task__body-icons">
        <i
          onClick={handleDeleteTask}
          className="far fa-trash-alt task__body-icon"></i>
        <i
          onClick={handleInfoClick}
          className="far fa-question-circle task__body-icon"></i>
      </div>
    </div>
  </div>
);

const DraggableTask = ({
  className,
  title,
  id,
  index,
  fetchTask,
  deleteTask,
  taskInfoId,
  taskInfoLoading,
}) => {
  const handleFetch = () => {
    // Check if the task to fetch isn't already fetched.
    const alreadyFetched = id == taskInfoId;

    if (!alreadyFetched && !taskInfoLoading) {
      fetchTask(id);
    }
  }

  const handleDeleteTask = () => {
    deleteTask(id);
  }

  return (
    <Draggable index={index} draggableId={new Number(id).toString()} key={id}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
        >
          <Task
            title={title}
            handleDeleteTask={handleDeleteTask}
            handleInfoClick={handleFetch}
          />
        </div>
      )}
    </Draggable>
  )
}

Task.propTypes = {
  title: propTypes.string,
  handleDeleteTask: propTypes.func,
  handleInfoClick: propTypes.func,
};

DraggableTask.propTypes = {
  className: propTypes.string,
  id: propTypes.number,
  title: propTypes.string,
  index: propTypes.number,
  fetchTask: propTypes.func,
  deleteTask: propTypes.func,
  taskInfoId: propTypes.number,
  taskInfoLoading: propTypes.bool,
}

const stateToProps = state => ({
  taskInfoLoading: selectTaskInfoLoading(state),
  taskInfoId: selectTaskInfoId(state),
});

const dispatchToProps = dispatch => ({
  fetchTask: taskId => dispatch(fetchTask(taskId)),
  deleteTask: taskId => dispatch(deleteTask(taskId)),
})
export default connect(stateToProps, dispatchToProps)(DraggableTask);