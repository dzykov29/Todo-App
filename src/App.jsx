import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Modal from './components/UI/Modal';
import Overlay from './components/UI/Overlay';

function App() {
  const [todoTasks, setTodoTasks] = useState([]);
  const [modal, setModal] = useState(false)
  const newTaskRef = useRef();

  // Загрузка задач из localStorage при монтировании компонента
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    setTodoTasks(storedTasks);
  }, []);

  // Сохранение задач в localStorage при изменении todoTasks
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  }, [todoTasks]);

  const handleAddTask = (newTask) => {
    setTodoTasks((prevTasks) => [...prevTasks, newTask]);
    setModal(false)
  }

  const handleDeleteTask = (id) => {
    setTodoTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((prevTask) => prevTask.id !== id);
      localStorage.setItem('todoTasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleUpdateTaskDone = (id, done) => {
    setTodoTasks((prevTasks) => 
      prevTasks.map((prevTask) =>
        prevTask.id === id ? { ...prevTask, done } : prevTask
      )
    );
  };

  const handleUpdateTaskDescr = (id, descr) => {
    setTodoTasks((prev) => prev.map((prevTask) => 
    prevTask.id === id ? {...prevTask, descr} : prevTask
    ))
  }

  const handleModal = () => {
    setModal(true)
    setTimeout(() => {
      if (newTaskRef.current) {
        newTaskRef.current.focus();
      }
    }, 0);
  }

  const handleCloseOverlay = () => {
    setModal(false)
  }

  // Сортировка по полю 'done'
  const sortedTasks = todoTasks.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

  return (
    <div className='container'>
      <button className='btn item__btn btn-reset' style={{marginBottom: 15}} onClick={handleModal} >Добавить дело</button>
      {modal && 
        <Overlay handleCloseOverlay={handleCloseOverlay} />
      }
      {modal &&
        <Modal handleAddTask={handleAddTask} newTaskRef={newTaskRef} />
      }
      { !todoTasks.length ? 
      <div>Список пуст...</div>
        :
        <TodoList deleteTask={handleDeleteTask} taskDescr={handleUpdateTaskDescr} taskDone={handleUpdateTaskDone} tasks={sortedTasks} />
      }
      
    </div>
  );
}

export default App;
