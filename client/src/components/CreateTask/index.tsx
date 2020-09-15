// Packages
import React, { useState } from 'react';
import useOnclickOutside from "react-cool-onclickoutside";
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

// Project
import { addTask } from '../../actions/board';
import Loading from '../Loading';
import './styles.scss';

interface CreateTaskProps {
  addTask: Function,
  listId: number,
};

interface CreateTaskForm {
  title: string
};

const CreateTask = ({ addTask, listId }: CreateTaskProps): JSX.Element => {
  const { handleSubmit, register, errors } = useForm();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const clickOutsideRef = useOnclickOutside(() => setIsActive(false));

  const onSubmit = ({ title }: CreateTaskForm): void => {
    addTask(title, listId);
  };

  return (
    <div className="create-task" ref={clickOutsideRef}>
      <Loading display={isLoading} />
      {
        !isActive
          ? (
            <span
              className="create-task__placeholder"
              onClick={() => { setIsActive(true); }}
            >
              <i className="fas fa-plus create-task__placeholder-icon"></i> Create task
            </span>
          )
          : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <textarea
                  className="create-task__textarea"
                  placeholder="Introduce a title for this task..."
                  name="title"
                  ref={register({ required: "Required" })}
                ></textarea>
                <button type="submit" className="btn btn--block">Create</button>
              </div>
            </form>
          )
      }
    </div>
  )
}

const dispatchToProps = dispatch => ({
  addTask: (taskTitle, listId) => dispatch(addTask(taskTitle, listId))
});

export default withRouter(connect(undefined, dispatchToProps)(CreateTask));