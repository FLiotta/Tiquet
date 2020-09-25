// Packages
import React, { useState } from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

// Project
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

interface IProps {
  extraClassName?: string,
  description: string,
  title: string,
  isOpen: boolean,
  onSuccess(callback: Function): any,
  onCancel(): any,
};

const ConfirmationModal = ({
  onSuccess,
  onCancel,
  extraClassName,
  title,
  description,
  isOpen,
}: IProps): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const handleConfirmClick = () => {
    setLoading(true);
    onSuccess(() => {
      setLoading(false);
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCancel}
    >
      <div className={cn("confirmation-modal", extraClassName)}>
        <div className="confirmation-modal__header">
          <h6 className="confirmation-modal__header-title">{title}</h6>
          <i
            onClick={onCancel}
            className="fas fa-times confirmation-modal__header-close"
          >
          </i>
        </div>
        <hr />
        <div className="confirmation-modal__body">
          <p>{description}</p>
        </div>
        <div className="confirmation-modal__footer">
          <button
            className="btn btn--sm btn--danger"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn--sm btn--success"
            onClick={handleConfirmClick}
            disabled={loading}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;