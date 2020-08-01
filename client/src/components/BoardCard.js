// @Packages
import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

// @Project
import '../styles/components/BoardCard.scss';

const BoardCard = ({ className, boardInfo }) => (
  <Link to={'/b/' + boardInfo.id} className="text-decoration-none">
    <div className={cn('boardcard', className)} >
      <h2 className="boardcard__title">{boardInfo.title}</h2>
    </div>
  </Link>
)

BoardCard.propTypes = {
  className: propTypes.string,
  boardInfo: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
  }).isRequired,
}

export default BoardCard;