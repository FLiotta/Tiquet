// @Packages
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// @Project
import Loading from '../components/Loading';
import BoardCard from '../components/BoardCard';
import { fetchBoards } from '../actions/boards';
import { selectBoards } from '../selectors/boards';

// @Own
import '../styles/pages/Boards.scss';

const Boards = ({ boards, fetchBoards }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards()
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="board-page">
      <Loading display={loading} />
      {!loading && (
        <div className="board-page__container">
          <h2 className="board-page__container-title">Boards</h2>
          <div className="board-page__container-content">
            {boards.map(board => (
              <BoardCard
                key={'board_' + board.id}
                boardInfo={board}
                className="board-page__custom-card"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
};

const mapStateToProps = state => ({
  boards: selectBoards(state)
});

const mapDispatchToProps = dispatch => ({
  fetchBoards: () => dispatch(fetchBoards())
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards); 