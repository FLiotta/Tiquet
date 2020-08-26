// @Packages
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

// @Project
import { addList } from '../actions/board';
import Loading from './Loading';

// @Own
import '../styles/components/CreateList.scss';

const CreateList = ({ addList, match }) => {
  const { handleSubmit, register, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const getBoardId = match => match.params.id;

  const onSubmit = ({ title }) => {
    const boardId = getBoardId(match);

    setIsLoading(true);

    addList(boardId, title)
      .then(() => setIsLoading(false));
  };

  return (
    <div className="create-list">
      <h5 className="create-list__title">Create list</h5>
      <div className="create-list__column">
        <Loading display={isLoading} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            className="form-control" 
            name="title" 
            placeholder="e.g: todo"
            ref={register({ required: "Required" })}
          />
          <button type="submit" className="btn btn-success btn-sm btn-block mt-2">Create</button>
        </form>
      </div>
    </div>
  )
}

CreateList.propTypes = {
  addList: propTypes.func,
  match: propTypes.object,
}

const dispatchToProps = dispatch => ({
  addList: (boardId, title) => dispatch(addList(boardId, title))
});

export default withRouter(connect(undefined, dispatchToProps)(CreateList));