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
  fetchPriorities,
  deleteList,
  sortList,
} from '../../actions/board';
import List from '../../components/List';
import CreateList from '../../components/CreateList';
import Loading from '../../components/Loading';
import './styles.scss';
import TaskDescription from '../../components/TaskDescription';
import { IBoard } from '../../interfaces/Board';
import { AxiosPromise } from 'axios';

interface IProps {
  fetchBoard(boardId: number): AxiosPromise,
  moveTask(originListId: number, destinationListId: number, taskId: number, destinationIndex: number): void,
  board: IBoard,
  match: any,
  resetState(): void,
  fetchPriorities(): void
  deleteList(listId: number): void,
  sortList(listId: number, taskId: number, index:number, destinationIndex: number): void,
};

const Board = ({
  fetchBoard,
  moveTask,
  board,
  match,
  resetState,
  fetchPriorities,
  deleteList,
  sortList,
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
    console.log(e);
    const { draggableId, destination, source } = e;
    const originListId = parseInt(source.droppableId);
    const destinationListId = parseInt(destination.droppableId);
    const taskId = parseInt(draggableId);

    if (originListId != destinationListId) {
      moveTask(originListId, destinationListId, taskId, destination.index);
    } else {
      sortList(originListId, taskId, source.index, destination.index);
    }
  }

  const onListDelete = (listId: number) => {
    deleteList(listId);
  };

  return (
    <div className="board">
      <Loading display={isLoading} />
      <TaskDescription />
      <h1 className="board__title">{board.title}</h1>
      <div className="board__columns">
        <DragDropContext onDragEnd={result => onDragEnd(result)} >
          {board.lists.map(list => (
            <List
              key={list.id}
              onDelete={() => onListDelete(list.id)}
              {...list}
            />
          ))}
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
  fetchBoard: (boardId): AxiosPromise => dispatch(fetchBoard(boardId)),
  resetState: () => dispatch(resetState()),
  deleteList: (listId: number) => dispatch(deleteList(listId)),
  sortList: (listId: number, taskId: number,index: number, destinationIndex: number) => dispatch(sortList(listId, taskId, index, destinationIndex)),
  moveTask: (originListId, destinationListId, taskId, destinationIndex) => dispatch(moveTask(originListId, destinationListId, taskId, destinationIndex)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));