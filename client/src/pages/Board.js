import React, { useEffect, Fragment } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { fetchBoard } from '../actions/board';
import List from '../components/List';
import '../styles/pages/Board.scss';

const Board = ({
  fetchBoard,
  board,
  match,
  ...rest
}) => {
  useEffect(() => {
    const boardId = match.params.id;

    fetchBoard(boardId);
  }, []);

  const onDragEnd = (q) => {
    console.log(q);
  }
  return (
    <div className="board">
      <div className="board__container">
        <h2 className="board__title">{board.title}</h2>
        <div style={{
          display: 'flex'
        }}>

          <DragDropContext
            onDragEnd={result => onDragEnd(result)}
          >
            {board.lists.map(list => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 9
                }}
                key={list.id}>
                <h5>{list.title}</h5>
                <div>
                  <Droppable droppableId={new Number(list.id).toString()} key={list.title}>
                    {(provided) => (
                      <Fragment>
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            minWidth: 200,
                            minHeight: 400,
                            backgroundColor: 'red'
                          }}>
                          {list.tasks.map((task, index) => (
                            <Draggable
                              index={index}
                              draggableId={task.uid}
                              key={task.id}>
                              {(dragProvided) => (
                                <div
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  {...dragProvided.dragHandleProps}>
                                  {task.title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                        {provided.placeholder}
                      </Fragment>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </DragDropContext>

        </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);