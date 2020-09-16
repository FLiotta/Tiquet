// Packages
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { withRouter } from 'react-router-dom';

// Project
import {
  fetchBoard,
  moveTask,
  resetState,
  fetchPriorities
} from '../../actions/board';
import List from '../../components/List';
import CreateList from '../../components/CreateList';
import Loading from '../../components/Loading';
import './styles.scss';
import TaskDescription from '../../components/TaskDescription';
import { BoardInterface } from '../../interfaces/Board';

interface IProps {
  fetchBoard: Function,
  moveTask: Function,
  board: BoardInterface,
  match: any,
  resetState: Function,
  fetchPriorities: Function
};

const Board = ({
  fetchBoard,
  moveTask,
  board,
  match,
  resetState,
  fetchPriorities,
}: IProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const boardId: number = match.params.id;

    fetchPriorities();
    fetchBoard(boardId)
      .then(() => setIsLoading(false));

    return () => {
      resetState();
    }
  }, []);

  const onDragEnd = (e: any): void => {
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
      <h1 className="board__title">{board.title}</h1>
      <div className="board__columns">
        <DragDropContext onDragEnd={result => onDragEnd(result)} >
          {board.lists.map(list => <List key={list.id} {...list} />)}
        </DragDropContext>
        <CreateList />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  board: state.board
});

const mapDispatchToProps = dispatch => ({
  fetchPriorities: () => dispatch(fetchPriorities()),
  fetchBoard: boardId => dispatch(fetchBoard(boardId)),
  resetState: () => dispatch(resetState()),
  moveTask: (originListId, destinationListId, taskId) => dispatch(moveTask(originListId, destinationListId, taskId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));