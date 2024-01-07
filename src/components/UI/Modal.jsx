import React from 'react';
import '../styles/Modal.css'
import Form from '../Form';

const Modal = ({ handleAddTask, newTaskRef }) => {
    return (
        <div className='modal'>
            <Form addNewTask={handleAddTask} newTaskRef={newTaskRef} />
        </div>
    );
};

export default Modal;