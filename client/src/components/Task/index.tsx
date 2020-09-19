// Packages
import React, { Fragment } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

// Project
import { selectTaskInfoLoading, selectTaskInfo } from '../../selectors/taskDescription';
import { fetchTask } from '../../actions/taskDescription';
import { deleteTask } from '../../actions/board';
import { TaskInterface } from '../../interfaces/Task';
import './styles.scss';

interface TaskProps {
  title: string,
  priority: string,
  handleDeleteTask: Function,
  handleInfoClick: Function,
};

export const Task = ({
  title,
  priority,
  handleDeleteTask,
  handleInfoClick
}: TaskProps): JSX.Element => {
  const parsePriority = (priorityToParse: string): string => {
    switch (priorityToParse) {
      case 'LOW':
        return 'Low priority';
      case 'MEDIUM':
        return 'Medium priority';
      case 'HIGH':
        return 'Highest priority';
      default:
        return priorityToParse;
    }
  }

  return (
    <div className="task">
      <div>
        <p className="task__title">{title}</p>
      </div>
      <div className="task__body">
        <div className="task__body-priority">
          {priority && (
            <Fragment>
              <div className={cn("task__body-priority__bubble", {
                "task__body-priority__bubble--low": priority == "LOW",
                "task__body-priority__bubble--medium": priority == "MEDIUM",
                "task__body-priority__bubble--high": priority == "HIGH"
              })}></div>
              <span className="task__body-priority__value">{parsePriority(priority)}</span>
            </Fragment>
          )}
        </div>
        <div className="task__body-icons">
          <i
            onClick={() => handleDeleteTask()}
            className="far fa-trash-alt task__body-icon"></i>
          <i
            onClick={() => handleInfoClick()}
            className="far fa-question-circle task__body-icon"></i>
        </div>
      </div>
    </div>
  );
}

interface DraggableTaskProps {
  className?: string,
  title: string,
  id: number,
  index: number,
  fetchTask: Function,
  deleteTask: Function,
  taskInfo: TaskInterface,
  taskInfoLoading: Boolean,
  priority?: string,
};

const DraggableTask = ({
  title,
  id,
  index,
  fetchTask,
  deleteTask,
  taskInfo,
  taskInfoLoading,
  priority,
}: DraggableTaskProps): JSX.Element => {
  const handleFetch = (): void => {
    // Check if the task to fetch isn't already fetched.
    const alreadyFetched = id === taskInfo?.id;

    if (!alreadyFetched && !taskInfoLoading) {
      fetchTask(id);
    }
  }

  const handleDeleteTask = (): void => {
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
            priority={priority}
            handleDeleteTask={handleDeleteTask}
            handleInfoClick={handleFetch}
          />
        </div>
      )}
    </Draggable>
  )
}

const stateToProps = state => ({
  taskInfoLoading: selectTaskInfoLoading(state),
  taskInfo: selectTaskInfo(state),
});

const dispatchToProps = dispatch => ({
  fetchTask: taskId => dispatch(fetchTask(taskId)),
  deleteTask: taskId => dispatch(deleteTask(taskId)),
});

export default connect(stateToProps, dispatchToProps)(DraggableTask);