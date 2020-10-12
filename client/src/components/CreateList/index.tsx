// Packages
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

// Project
import { trackEvent } from '../../utils/ga';
import { addList } from '../../actions/board';
import Loading from '../Loading';
import './styles.scss';

interface CreateListProps {
  addList: Function,
  match: any
};

interface CreateListForm {
  title: string
};

const CreateList = ({ addList, match }: CreateListProps): JSX.Element => {
  const { handleSubmit, register, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const getBoardId = match => match.params.id;

  const onSubmit = ({ title }: CreateListForm): void => {
    const boardId = getBoardId(match);

    setIsLoading(true);

    addList(boardId, title)
      .then(() => {
        trackEvent({
          category: 'Lists',
          action: 'List created'
        });
        setIsLoading(false)
      });
  };

  return (
    <div className="create-list">
      <div className="create-list__header">
        <h6 className="create-list__header-title">CREATE LIST</h6>
      </div>
      <Loading display={isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="form-control"
            name="title"
            placeholder="Introduce a title for this list..."
            ref={register({ required: "Required" })}
          />
          <button type="submit" className="btn btn--block">Create</button>
        </div>
      </form>
    </div>
  )
}

const dispatchToProps = dispatch => ({
  addList: (boardId, title) => dispatch(addList(boardId, title))
});

export default withRouter(connect(undefined, dispatchToProps)(CreateList));