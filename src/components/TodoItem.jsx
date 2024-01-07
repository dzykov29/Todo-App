import React, { useState, useEffect, useRef } from 'react';
import './styles/TodoItem.css';

function TodoItem({ task, deleteTask, updateTaskDone, updateTaskDescr }) {

  const [done, setDone] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedDescr, setEditedDescr] = useState(task.descr);
  const editTaskRef = useRef(null);

  //Удаление задачи
  const handleDeleteItem = (e) => {
    e.preventDefault();
    deleteTask(task.id);
  }

  //Отметка о выполнении
  const handleDone = () => {
    setDone(!done)
    updateTaskDone(task.id, !done);
  }

  //Открытие редактирования
  const handleEdit = () => {
    setEdit(true)
  }

  //Сохранение редактирования
  const handleSaveEdit = () => {
    setEdit(false)
    updateTaskDescr(task.id, editedDescr)
  }

  //Отмена изменений
  const handleCancelEdit = () => {
    setEdit(false)
    setEditedDescr(task.descr)
  }

  useEffect(() => {
    setDone(task.done); // Обновляем состояние, когда task.done изменяется извне
  }, [task.done]);

  useEffect(() => {
    if (editTaskRef.current) {
      editTaskRef.current.focus();
    }
  }, [editTaskRef, edit])

  return (
    <li className='todo-list__item item'>
      <div className='item__wrapper'>
          <input className='item__input' type='checkbox' onChange={handleDone} checked={done} />
        {edit ? (
          <div className='item__edit'>
            <input
              type='text'
              value={editedDescr}
              onChange={(e) => setEditedDescr(e.target.value)}
              ref={editTaskRef}
            />
            <button className='btn edit__btn btn-reset' onClick={handleSaveEdit}>Сохранить</button>
            <button className='btn edit__btn btn-reset' onClick={handleCancelEdit}>Отмена</button>
          </div>
        ) : done ? (
          <p className='item__descr'><s>{task.descr}</s></p>
        ) : (
          <p className='item__descr' onClick={handleEdit}>{task.descr}</p>
        )}
      </div>
      {!edit &&
        <button className='btn item__btn btn-reset' type='button' onClick={handleDeleteItem}>Удалить дело</button> }
    </li>
  );
}

export default TodoItem;
