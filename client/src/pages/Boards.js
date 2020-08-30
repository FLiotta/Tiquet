// @Packages
import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// @Project
import Loading from '../components/Loading';
import BoardCard from '../components/BoardCard';
import { fetchBoards, addBoard } from '../actions/boards';
import { selectBoards } from '../selectors/boards';
import CreateBoardModal from '../components/CreateBoardModal';
import ScrumBoard from '../assets/images/scrum-board.png';

// @Own
import '../styles/pages/Boards.scss';

const Boards = ({ boards, fetchBoards, addBoard }) => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBoards()
      .then(() => setLoading(false));
  }, []);

  const createModalSucces = (serviceResponse) => {
    const { boardId, boardName } = serviceResponse;

    addBoard(boardId, boardName);
  }

  const hasBoards = () => !!boards.length;
  return (
    <div className="board-page">
      <CreateBoardModal
        onCreationSuccess={createModalSucces}
        isOpen={isModalOpen}
        closeModal={() => { setIsModalOpen(false) }}
      />
      <Loading display={loading} />
      {(!loading && hasBoards()) && (
        <Fragment>
          <div className="board-page__header">
            <h2 className="board-page__header-title">Boards</h2>
            <button
              onClick={() => { setIsModalOpen(true); }}
              className="btn btn-primary rounded-pill btn-sm mr-4"
            >
              Create Board
            </button>
          </div>
          <div className="board-page__container">
            {boards.map(board => (
              <BoardCard
                key={'board_' + board.id}
                boardInfo={board}
                className="board-page__custom-card"
              />
            ))}
          </div>
        </Fragment>
      )}
      {(!loading && !hasBoards()) && (
        <div className="board-page__new">
          <div>
            <h1 className="board-page__new-title">You don't have any board created</h1>
            <p className="board-page__new-description">Within boards you can organize your job in tasks and group them on lists!</p>
            <img src={ScrumBoard} className="board-page__new-image" />
            <button
              className="btn btn-brand-secondary rounded-pill"
              onClick={() => { setIsModalOpen(true); }}
            >
              New board
            </button>
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
  fetchBoards: () => dispatch(fetchBoards()),
  addBoard: (id, title) => dispatch(addBoard(id, title))
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards); 