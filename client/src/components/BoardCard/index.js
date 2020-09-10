// Packages
import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

// Project
import './styles.scss';

const BoardCard = ({ className, boardInfo }) => (
  <div className={cn('boardcard', className)} >
    <Link to={'/b/' + boardInfo.id} className="text-decoration-none">
      <div className="boardcard__header">
        <h5 className="boardcard__header-title">Title</h5>
      </div>
      <div className="boardcard__body">
      <p className="boardcard__body-item">4 Lists</p>
      <p className="boardcard__body-item">32 Tasks</p>
      <p className="boardcard__body-item">7 Contributors</p>
      </div>
    </Link>
  </div>
)

BoardCard.propTypes = {
  className: propTypes.string,
  boardInfo: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
  }).isRequired,
}

export default BoardCard;