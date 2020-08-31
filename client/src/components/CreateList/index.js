// Packages
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

// Project
import { addList } from '../../actions/board';
import Loading from '../Loading';
import './styles.scss';

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
      <div className="create-list__column">
        <h6 className="create-list__title">CREATE LIST</h6>
        <hr />
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