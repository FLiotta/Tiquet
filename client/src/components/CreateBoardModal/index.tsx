// Packages
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import cogoToast from 'cogo-toast';

// Project
import Loading from '../Loading';
import { trackEvent } from '../../utils/ga';
import BoardsServices from '../../services/boardsService';
import './styles.scss';

// Declarations
Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  }
}

interface CreateBoardModalProps {
  onCreationSuccess: Function,
  onCreationFailure: Function,
  closeModal: Function,
  isOpen: Boolean,
};

interface CreateBoardModalForm {
  boardName: string
};

const CreateBoardModal = ({
  onCreationSuccess,
  onCreationFailure,
  closeModal,
  isOpen
}: CreateBoardModalProps): JSX.Element => {
  const { handleSubmit, register, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = ({ boardName }: CreateBoardModalForm): void => {
    const boardService = new BoardsServices();
    setIsLoading(true);

    boardService.createBoard(boardName)
      .then(({ data }) => {
        setIsLoading(false);
        trackEvent({
          category: 'Boards',
          action: 'Board created',
        });
        cogoToast.success(`${boardName} has been created 😊`, { position: 'bottom-right' });
        onCreationSuccess(data);
      })
      .catch((e) => {
        trackEvent({
          category: 'Boards',
          action: 'Failed to create board',
        });
        cogoToast.error('Whoops, something happened.', { position: 'bottom-right' });
        onCreationFailure(e);
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
    >
      <Loading display={isLoading} />
      <div className="create-board-modal">
        <div className="create-board-modal__header">
          <h6 className="create-board-modal__header-title">Create a new board</h6>
          <i
            onClick={() => closeModal()}
            className="fas fa-times create-board-modal__header-close"
          >
          </i>
        </div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              name="boardName"
              className="form-control"
              disabled={isLoading}
              ref={register({ required: "Required" })}
              placeholder="How should it be named?" />
            <button disabled={isLoading} className="btn btn--block">Submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

CreateBoardModal.defaultProps = {
  onCreationFailure: () => { },
  onCreationSuccess: () => { },
  closeModal: () => { }
}

export default CreateBoardModal;