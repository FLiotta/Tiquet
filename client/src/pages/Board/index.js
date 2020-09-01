// Packages
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

// Project
import { fetchBoard, moveTask, resetState } from '../../actions/board';
import List from '../../components/List';
import CreateList from '../../components/CreateList';
import Loading from '../../components/Loading';
import './styles.scss';
import TaskDescription from '../../components/TaskDescription';

const Board = ({
  fetchBoard,
  moveTask,
  board,
  match,
  resetState,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const boardId = match.params.id;

    fetchBoard(boardId)
      .then(() => setIsLoading(false));

    return () => {
      resetState();
    }
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
      <Loading display={isLoading} />
      <TaskDescription />
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
  resetState: propTypes.func,
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
  resetState: () => dispatch(resetState()),
  moveTask: (originListId, destinationListId, taskId) => dispatch(moveTask(originListId, destinationListId, taskId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);