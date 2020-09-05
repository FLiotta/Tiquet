// Packages
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import dayjs from 'dayjs';
import cogoToast from 'cogo-toast';
import { useForm } from 'react-hook-form';

// Project
import Loading from '../Loading';
import { selectTaskInfoVisible, selectTaskInfoLoading, selectTaskInfo } from '../../selectors/taskDescription';
import { setVisibility, resetState, updateDescription } from '../../actions/taskDescription';
import './styles.scss';

const TaskDescription = ({
  visible,
  resetState,
  loading,
  task,
  updateDescription
}) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = ({ description }) => {
    if (task.description === description) {
      return cogoToast.warn("Description can't be the same 🤨", {
        position: 'bottom-right'
      });
    }

    updateDescription(task.id, description)
      .then(() => {
        cogoToast.success("Description updated!", {
          position: 'bottom-right'
        });
      })
  }

  const close = () => resetState();

  const toggleDescription = (e) => {
    e.preventDefault();
    setIsEditingDescription(!isEditingDescription)
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(`Task id: #${id}`);
    cogoToast.success('Id copied to clipboard.', {
      position: 'bottom-right'
    });
  };

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
          onClick={close}
          className="fas fa-arrow-right fa-lg task-description__header-arrow">
        </i>
      </div>
      <hr />
      <div className="task-description__sections">
        <div className="task-description__sections-created">
          <p><strong>Created:</strong></p>
          <div>
            <p>
              {task.createdAt ? dayjs(task.createdAt).format('DD/MM/YYYY [At] HH:MM') : 'No date available'}
            </p>
          </div>
        </div>
        <div className="task-description__sections-description">
          <p><strong>Description:</strong></p>
          <p>{task.description || 'Not provided'}</p>
          {isEditingDescription ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <textarea
                  id="description"
                  name="description"
                  ref={register({ required: "Required" })}
                  defaultValue={task.description}
                >
                </textarea>
              </div>
              <div className="form-group">
              <button
                  type="submit"
                  className="btn btn-block"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleDescription}
                  className="btn btn-block"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
              <a href="#" onClick={toggleDescription}>Edit description</a>
            )}
        </div>
      </div>
    </div>
  )
}

TaskDescription.propTypes = {
  visible: propTypes.bool,
  setVisibility: propTypes.func,
  updateDescription: propTypes.func,
}

TaskDescription.defaultProps = {
  visible: true,
}

const stateToProps = state => ({
  visible: selectTaskInfoVisible(state),
  loading: selectTaskInfoLoading(state),
  task: selectTaskInfo(state),
});

const dispatchToProps = dispatch => ({
  setVisibility: state => dispatch(setVisibility(state)),
  resetState: () => dispatch(resetState()),
  updateDescription: (taskId, description) => dispatch(updateDescription(taskId, description)),
})

export default connect(stateToProps, dispatchToProps)(TaskDescription);
