// @Packages
import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// @Project
import Loading from '../components/Loading';
import BoardCard from '../components/BoardCard';
import { fetchBoards, addBoard } from '../actions/boards';
import { selectBoards } from '../selectors/boards';
import CreateBoardModal from '../components/CreateBoardModal';

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

  return (
    <div className="board-page">
      <CreateBoardModal 
        onCreationSuccess={createModalSucces} 
        isOpen={isModalOpen}
        closeModal={() => { setIsModalOpen(false) }}
      />
      <Loading display={loading} />
      {!loading && (
        <Fragment>
          <div className="board-page__header">
            <h2 className="board-page__header-title">Boards</h2>  
            <button 
              onClick={() => { setIsModalOpen(true); }}
              className="btn btn-success btn-sm"
            >
              Create Board
            </button>
          </div>
          <div className="board-page__container">
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
        </Fragment>
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