import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchBoard } from '../actions/boards';

const Board = (props) => {
  useEffect(() => {
    props.fetchBoard(10);
  }, []);

  return (
    <p>board page</p>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchBoard: boardId => dispatch(fetchBoard(boardId)),
})

export default connect(undefined, mapDispatchToProps)(Board);