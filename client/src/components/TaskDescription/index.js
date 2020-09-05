// Packages
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import dayjs from 'dayjs';
import cogoToast from 'cogo-toast';

// Project
import Loading from '../Loading';
import { selectTaskInfoVisible, selectTaskInfoLoading, selectTaskInfo } from '../../selectors/taskDescription';
import { setVisibility, resetState } from '../../actions/taskDescription';
import './styles.scss';

const TaskDescription = ({ visible, resetState, loading, task }) => {

  const close = () => resetState();

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(`Task id: #${id}`);
    cogoToast.success('Id copied to clipboard.', {
      position: 'bottom-right'
    });
  };

  return (
    <div className={cn('task-description', {
      'task-description--visible': visible,
      'task-description--hidden': !visible
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
      <div className="task-description__body">
        <div className="task-description__body-section">
          <p>
            <strong className="task-description__body-section__title">Created:</strong>
            <span>
              {task.createdAt ? dayjs(task.createdAt).format('DD/MM/YYYY [At] HH:MM') : 'No date available'}
            </span>
          </p>
        </div>
        <div className="task-description__body-section">
          <p>
            <strong className="task-description__body-section__title">Description:</strong>
            {task.description
              ? (
                <span>
                  <br />
                  {task.description}
                </span>
              ) : (
                <a href="#">Add description</a>
              )
            }
          </p>
        </div>
      </div>
    </div >
  )
}

TaskDescription.propTypes = {
  visible: propTypes.bool,
  setVisibility: propTypes.func,
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
})

export default connect(stateToProps, dispatchToProps)(TaskDescription);
