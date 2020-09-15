// Packages
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

// Project
import './styles.scss';

interface BoardCardProps {
  className: String,
  boardInfo:  {
    id: Number,
    title: String
  }
}

export default ({ className, boardInfo }: BoardCardProps): JSX.Element => (
  <div className={cn('boardcard', className)} >
    <Link to={'/b/' + boardInfo.id} className="text-decoration-none">
      <div className="boardcard__header">
        <h5 className="boardcard__header-title">{boardInfo.title}</h5>
      </div>
      <div className="boardcard__body">
        <p className="boardcard__body-item">
          <i className="far fa-list-alt boardcard__body-icon"></i>
          4 Lists
        </p>
        <p className="boardcard__body-item">
          <i className="far fa-check-square boardcard__body-icon"></i>
          32 Tasks
        </p>
      </div>
    </Link>
  </div>
);