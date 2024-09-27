import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import TaskService from '../services/TaskService';
import { TfiAlignJustify } from "react-icons/tfi";

function TaskList() {
  const [showPopup, setShowPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of tasks per page

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleOpenPopup = () => {
    setEditingTask(null);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveTask = async (newTask) => {
    try {
      const response = await TaskService.createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setEditingTask(taskToEdit);
    setShowPopup(true);
  };

  const handleDeleteTask = async (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    const confirmDelete = window.confirm(`Do you want to delete task ${taskToDelete.description}?`);
    
    if (confirmDelete) {
      try {
        await TaskService.deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const response = await TaskService.updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / pageSize);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Slicing tasks for the current page
  const paginatedTasks = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="container mt-3">
      {/* First Row: Task Logo and Buttons */}
      <div className="row align-items-center mb-3">
        <div className="col-md-6 d-flex align-items-center">
          <TfiAlignJustify className="mr-2" />
          <h3 className="mb-0">Tasks</h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button className="btn btn-warning btn-sm mr-2" onClick={handleOpenPopup}>New Task</button>
          <button className="btn btn-warning btn-sm" onClick={fetchTasks}>Refresh</button>
        </div>
      </div>

      {/* Second Row: All Tasks and Search */}
      <div className="row align-items-center mb-3">
        <div className="col-md-6">
          <h5 style={{ fontSize: '1.2rem' }}>All Tasks</h5>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <input
            type="text"
            className="form-control form-control-sm w-75"
            placeholder="Search"
          />
          <button className="btn btn-light btn-sm ml-2">🔍</button>
        </div>
      </div>

      <p>{`${tasks.length} records`}</p>

      <table border="1" width="100%" cellPadding={10}>
        <thead>
          <tr>
            <th><input type='checkbox'/></th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task) => (
            <tr key={task.id}>
              <td><input type='checkbox'/></td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditTask(task.id)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteTask(task.id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className='footer'>
        <div className='d-flex align-items-center'>
          <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <button disabled>{currentPage}</button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
        </div>
      </footer>

      {showPopup && <TaskForm handleClosePopup={handleClosePopup} onSave={handleSaveTask} editingTask={editingTask} onUpdate={handleUpdateTask} />}
    </div>
  );
}

export default TaskList;
