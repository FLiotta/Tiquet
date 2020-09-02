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

const Task = ({
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
    <Draggable
      index={index}
      draggableId={new Number(id).toString()}
      key={id}>
      {(dragProvided) => (
        <div
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
          className={cn("task", className)}>
          <p className="task__title">{title}</p>
          <div className="task__icons">
            <i
              onClick={handleDeleteTask}
              className="far fa-trash-alt task__icon"></i>
            <i
              onClick={handleFetch}
              className="far fa-question-circle task__icon"></i>
          </div>
        </div>
      )}
    </Draggable>
  )
}

Task.propTypes = {
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
export default connect(stateToProps, dispatchToProps)(Task);