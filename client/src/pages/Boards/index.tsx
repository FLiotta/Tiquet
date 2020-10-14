// Packages
import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// Project
import { trackPageView } from '../../utils/ga';
import Loading from '../../components/Loading';
import BoardCard from '../../components/BoardCard';
import { fetchBoards, addBoard, filterBoard } from '../../actions/boards';
import { selectBoards } from '../../selectors/boards';
import CreateBoardModal from '../../components/CreateBoardModal';
import ScrumBoard from '../../assets/images/scrum-board.png';
import './styles.scss';
import { IBoard } from '../../interfaces/Board';

interface IEmptyStateProps {
  onBtnClick: Function
};

const EmptyState = ({ onBtnClick }: IEmptyStateProps): JSX.Element => (
  <div className="board-page__new">
    <div>
      <h1 className="board-page__new-title">You don't have any boards created</h1>
      <p className="board-page__new-description">Within boards you can organize your job in tasks and group them on lists!</p>
      <img src={ScrumBoard} className="board-page__new-image" />
      <button
        className="btn btn-brand-secondary rounded-pill"
        onClick={() => onBtnClick()}
      >
        New board
      </button>
    </div>
  </div>
);

interface IProps {
  boards: IBoard[],
  fetchBoards: Function,
  addBoard: Function,
  filterBoard: Function,
};

const Boards = ({
  boards,
  fetchBoards,
  addBoard,
  filterBoard,
}: IProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (boards.length == 0) {
      setLoading(true);

      fetchBoards()
        .then(() => setLoading(false));
    }

    trackPageView('Boards');
  }, []);

  const createModalSucces = (serviceResponse: { boardId: number, boardName: string }) => {
    const { boardId, boardName } = serviceResponse;

    addBoard(boardId, boardName);
    setIsModalOpen(false);
  }

  const hasBoards = () => !!boards.length;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Fragment>
      <CreateBoardModal
        onCreationSuccess={createModalSucces}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      <div className="board-page">
        <Loading display={loading} />
        {(!loading && hasBoards()) && (
          <Fragment>
            <div className="board-page__header">
              <h1 className="board-page__header-title">All boards</h1>
              <button onClick={openModal} className="btn">
                Create Board
              </button>
            </div>
            <div className="board-page__container">
              {boards.map((board: IBoard): JSX.Element => (
                <BoardCard key={'board_' + board.id} boardInfo={board} onDelete={() => filterBoard(board.id)} />
              ))}
            </div>
          </Fragment>
        )}
        {(!loading && !hasBoards()) && (
          <EmptyState onBtnClick={openModal} />
        )}
      </div>
    </Fragment>
  )
};

const mapStateToProps = state => ({
  boards: selectBoards(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBoards: () => dispatch(fetchBoards()),
  addBoard: (id: number, title: string) => dispatch(addBoard(id, title)),
  filterBoard: (id: number) => dispatch(filterBoard(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards); 