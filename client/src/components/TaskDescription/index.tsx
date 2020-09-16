// Packages
import React, { Fragment, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import dayjs from 'dayjs';
import cogoToast from 'cogo-toast';
import { useForm } from 'react-hook-form';

// Project
import Loading from '../Loading';
import { selectPriorities } from '../../selectors/board';
import { updateTaskPriority } from '../../actions/board';
import {
  selectTaskInfoVisible,
  selectTaskInfoLoading,
  selectTaskInfo
} from '../../selectors/taskDescription';
import { TaskInterface } from '../../interfaces/Task';
import { PriortyInterface } from '../../interfaces/Priority';
import {
  setVisibility,
  resetState,
  updateDescription,
  updatePriority,
} from '../../actions/taskDescription';
import './styles.scss';

interface TaskDescriptionProps {
  visible: Boolean,
  resetState: Function,
  loading: Boolean,
  task: TaskInterface,
  updateDescription: Function,
  updatePriority: Function,
  updateTaskPriority: Function,
  priorities: PriortyInterface[],
};

interface TaskDescriptionForm {
  description: string
};

const TaskDescription = ({
  visible,
  resetState,
  loading,
  task,
  updateDescription,
  updatePriority,
  updateTaskPriority,
  priorities,
}: TaskDescriptionProps): JSX.Element => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = ({ description }: TaskDescriptionForm): any => {
    if (task.description === description) {
      return cogoToast.warn("Description can't be the same 🤨", {
        position: 'bottom-right'
      });
    }

    updateDescription(task.id, description)
      .then(() => {
        setIsEditingDescription(false);
        cogoToast.success("Description updated!", {
          position: 'bottom-right'
        });
      })
  }

  const toggleDescription = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setIsEditingDescription(!isEditingDescription)
  };

  const copyToClipboard = (id: string | number): void => {
    navigator.clipboard.writeText(`Task id: #${id}`);
    cogoToast.success('Id copied to clipboard.', {
      position: 'bottom-right'
    });
  };

  const parsePriority = (priority: string): string => {
    switch (priority) {
      case 'LOW':
        return 'Low priority';
      case 'MEDIUM':
        return 'Medium priority';
      case 'HIGH':
        return 'Highest priority';
      default:
        return priority;
    }
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const priorityId = e.target.value;

    updatePriority(task.id, priorityId)
      .then(() => {
        updateTaskPriority(task.id, priorityId);
      })
  }

  return (
    <div className={cn('task-description', {
      'task-description--visible': visible,
    })}>
      <Loading display={loading} />
      <div className="task-description__header">
        <h3 className="task-description__header-title">
          {task.title}
          <span
            className="task-description__header-id"
            onClick={() => copyToClipboard(task.id)}
          >
            #{task.id}
          </span>
        </h3>
        <i
          onClick={() => resetState()}
          className="fas fa-arrow-right fa-lg task-description__header-arrow">
        </i>
      </div>
      <hr />
      <div className="task-description__sections">
        <div>
          <p><strong>Created:</strong></p>
          <p>{task.createdAt ? dayjs(task.createdAt).format('DD/MM/YYYY [At] HH:MM') : 'No date available'}</p>
        </div>
        <div>
          <p><strong>Priority:</strong></p>
          <select onChange={handlePriorityChange}>
            {priorities.map(priority => (
              <option
                key={`priority_${priority.id}`}
                value={priority.id}
                defaultChecked={priority.value == task.priority}
              >
                {parsePriority(priority.value)}
              </option>
            ))}
          </select>
        </div>
        <div className="task-description__sections-description">
          <p><strong>Description:</strong></p>
          {!isEditingDescription
            ? (
              <Fragment>
                <p>{task.description || 'Not provided'}</p>
                <a href="#" onClick={toggleDescription}>Edit description</a>
              </Fragment>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="task-descrition__sections-description__textarea">
                  <textarea
                    rows={5}
                    id="description"
                    name="description"
                    ref={register({ required: "Required" })}
                    defaultValue={task.description}
                  ></textarea>
                </div>
                <div className="task-description__sections-description__buttons">
                  <button type="submit" className="btn btn--info btn--sm">Submit</button>
                  <button type="button" onClick={toggleDescription} className="btn btn--danger btn--sm">
                    Cancel
              </button>
                </div>
              </form>
            )}
        </div>
      </div>
    </div>
  )
}

TaskDescription.defaultProps = {
  visible: true,
}

const stateToProps = state => ({
  visible: selectTaskInfoVisible(state),
  loading: selectTaskInfoLoading(state),
  task: selectTaskInfo(state),
  priorities: selectPriorities(state),
});

const dispatchToProps = dispatch => ({
  setVisibility: state => dispatch(setVisibility(state)),
  resetState: () => dispatch(resetState()),
  updatePriority: (taskId, priority) => dispatch(updatePriority(taskId, priority)),
  updateTaskPriority: (taskId, priority) => dispatch(updateTaskPriority(taskId, priority)),
  updateDescription: (taskId, description) => dispatch(updateDescription(taskId, description)),
})

export default connect(stateToProps, dispatchToProps)(TaskDescription);
