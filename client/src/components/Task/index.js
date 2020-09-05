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

  const getTaskStyles = (isDragging, draggableStyle) => ({
    background: isDragging ? '#eee' : "#fff",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 4,
    minHeight: 40,
    width: '100%',
    padding: 10,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...draggableStyle
  });

  return (
    <Draggable
      index={index}
      draggableId={new Number(id).toString()}
      key={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getTaskStyles(
            snapshot.isDragging,
            provided.draggableProps.style
          )}>
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