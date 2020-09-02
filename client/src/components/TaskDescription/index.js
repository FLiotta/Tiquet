// Packages
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import dayjs from 'dayjs';

// Project
import Loading from '../Loading';
import { selectTaskInfoVisible, selectTaskInfoLoading, selectTaskInfo } from '../../selectors/taskDescription';
import { setVisibility, resetState } from '../../actions/taskDescription';
import GirlLamp from '../../assets/images/girl-lamp.png';
import './styles.scss';

const TaskDescription = ({ visible, resetState, loading, task }) => {

  const close = () => resetState();

  return (
    <div className={cn('task-description', {
      'task-description--visible': visible,
      'task-description--hidden': !visible
    })}>
      <Loading display={loading} />
      <div className="task-description__header">
        <h3 className="task-description__header-title">{task.title}</h3>
        <i 
          onClick={close} 
          className="fas fa-arrow-right fa-lg task-description__header-arrow">
        </i>
      </div>
      <hr />
      <div className="task-description__body">
        <img src={GirlLamp} className="task-description__body-image" />
      </div>
    </div>
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
