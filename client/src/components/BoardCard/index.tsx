// Packages
import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

// Project
import { trackEvent } from '../../utils/ga';
import ConfirmationModal from '../ConfirmationModal';
import BoardsService from '../../services/boardsService';
import './styles.scss';

// Declarations
const boardService = new BoardsService();

export interface BoardCardProps {
  className?: string,
  onDelete?: Function,
  boardInfo: {
    id: number,
    title: string
  }
}

export default ({ className, boardInfo, onDelete }: BoardCardProps): JSX.Element => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = (cb) => {
    boardService.deleteBoard(boardInfo.id)
      .then(() => {
        trackEvent({
          category: 'Boards',
          action: 'Board deleted',
        });
        onDelete();
      })
      .catch(e => console.log)
      .then(() => cb());
  }

  return (
    <div className={cn('boardcard', className)} >
      {onDelete && (
        <Fragment>
          <ConfirmationModal
            isOpen={deleteModalOpen}
            title="DELETE BOARD"
            description="Are you sure you want to delete this board?. All tasks will be lost."
            onSuccess={handleDelete}
            onCancel={() => setDeleteModalOpen(false)}
          />
          <i
            onClick={() => setDeleteModalOpen(true)}
            className="far fa-trash-alt boardcard__delete-icon"></i>
        </Fragment>
      )}
      <Link to={'/b/' + boardInfo.id} className="text-decoration-none">
        <div className="boardcard__header">
          <h5 className="boardcard__header-title">{boardInfo.title}</h5>
        </div>
      </Link>
    </div>
  );
};