import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ handleClosePopup, onSave, editingTask, onUpdate }) {
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setAssignedTo(editingTask.assignedTo);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate);
      setPriority(editingTask.priority);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const taskData = { assignedTo, status, dueDate, priority, description };
    if (editingTask) {
      onUpdate(editingTask.id, taskData); // Update existing task
    } else {
      onSave(taskData); // Save new task
    }

    handleClosePopup();
  };
  
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

  return (
    // console.table(users));
    <div className="popup">
      <div className="popup-content">
        <h3>{editingTask ? 'Edit Task' : 'New Task'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>*Assigned To</label>
              <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
                <option value="">Select User</option>
                <option value="User 1" >User 1</option>
                <option value="User 2">User 2</option>
                <option value="User 3">User 3</option>
                <option value="User 4">User 4</option>
                <option value="User 5">User 5</option>
                
              </select>
            </div>
            <div className="form-group">
              <label>*Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>*Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task details"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
   );
}

export default TaskForm;
