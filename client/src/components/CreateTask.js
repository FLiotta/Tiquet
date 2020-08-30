// @Packages
import React, { useState } from 'react';
import useOnclickOutside from "react-cool-onclickoutside";
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import cogoToast from 'cogo-toast';

// @Project
import { addTask } from '../actions/board';
import Loading from './Loading';

// @Own
import '../styles/components/CreateTask.scss';

const CreateTask = ({ addTask, listId }) => {
  const { handleSubmit, register, errors } = useForm();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const clickOutsideRef = useOnclickOutside(() => setIsActive(false));

  const onSubmit = ({ title }) => {
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
              onClick={() => {setIsActive(true);}}
            >
              <i className="fas fa-plus mr-1"></i> Create task
            </span>
          )
          : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="form-control"
                name="title"
                placeholder="e.g: buy toasts"
                ref={register({ required: "Required" })}
              />
              <button type="submit" className="btn btn-success btn-sm btn-block mt-2">Create</button>
            </form>
          )
      }
    </div>
  )
}

CreateTask.propTypes = {
  addTask: propTypes.func,
  listId: propTypes.number,
}

const dispatchToProps = dispatch => ({
  addTask: (taskTitle, listId) => dispatch(addTask(taskTitle, listId))
});

export default withRouter(connect(undefined, dispatchToProps)(CreateTask));