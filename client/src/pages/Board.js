// @Packages
import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

// @Projects
import { fetchBoard, moveTask } from '../actions/board';
import List from '../components/List';
import '../styles/pages/Board.scss';
import CreateList from '../components/CreateList';

const Board = ({
  fetchBoard,
  moveTask,
  board,
  match,
  ...rest
}) => {
  useEffect(() => {
    const boardId = match.params.id;

    fetchBoard(boardId);
  }, []);

  const onDragEnd = (e) => {
    const { draggableId, destination, source } = e;
    const originListId = parseInt(source.droppableId);
    const destinationListId = parseInt(destination.droppableId);
    const taskId = parseInt(draggableId);

    if (originListId != destinationListId) {
      moveTask(originListId, destinationListId, taskId);
    }
  }

  return (
    <div className="board">
      <h3 className="board__title">{board.title}</h3>
      <div className="board__columns">
        <DragDropContext onDragEnd={result => onDragEnd(result)} >
          {board.lists.map(list => <List key={list.id} {...list} />)}
        </DragDropContext>
        <CreateList />
      </div>
    </div>
  );
}

Board.propTypes = {
  fetchBoard: propTypes.func,
  board: propTypes.shape({
    title: propTypes.string,
    id: propTypes.number,
    lists: propTypes.array
  }),
};

const mapStateToProps = state => ({
  board: state.board
});

const mapDispatchToProps = dispatch => ({
  fetchBoard: boardId => dispatch(fetchBoard(boardId)),
  moveTask: (originListId, destinationListId, taskId) => dispatch(moveTask(originListId, destinationListId, taskId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);