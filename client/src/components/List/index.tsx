// Packages
import React, { useState, Fragment } from 'react';
import { Droppable } from 'react-beautiful-dnd';

// Project
import Task from '../Task';
import { TaskInterface } from '../../interfaces/Task';
import CreateTask from '../CreateTask';
import ConfirmationModal from '../ConfirmationModal';
import './styles.scss';

interface IProps {
  id: number,
  title: string,
  tasks: TaskInterface[],
  onDelete?(): void,
};

const List = ({ id, title, tasks, onDelete }: IProps): JSX.Element => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = (callback) => {
    // TODO
    // Dispatch and delete list
    onDelete()
    setDeleteModalOpen(false);

    callback();
  };

  const getListStyles = () => ({
    width: '100%',
    minHeight: 5,
    maxHeight: 350,
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  });

  return (
    <div className="list">
      {onDelete && (
        <Fragment>
          <ConfirmationModal
            isOpen={deleteModalOpen}
            title="DELETE LIST"
            description="Are you sure you want to delete this list?. All tasks will be lost."
            onSuccess={handleDelete}
            onCancel={() => setDeleteModalOpen(false)}
          />
          <i
            onClick={() => setDeleteModalOpen(true)}
            className="far fa-sm fa-trash-alt list__delete-icon"></i>
        </Fragment>
      )}
      <div className="list__header">
        <h6 className="list__header-title">{title.toUpperCase()}</h6>
      </div>
      <div className="list__body">
        <Droppable droppableId={new Number(id).toString()} key={`${title}_${id}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyles()}
            >
              {tasks.map((task: TaskInterface, index: number) => (
                <Task key={task.uid} {...task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="list__footer">
        <CreateTask listId={id} />
      </div>
    </div>
  );
}

export default List;