import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

class TaskService {
  // Fetch all tasks
  getAllTasks() {
    return axios.get(API_URL);
  }

  // Create a new task
  createTask(taskData) {
    return axios.post(API_URL, taskData);
  }

  // Update an existing task
  updateTask(id, taskData) {
    return axios.put(`${API_URL}/${id}`, taskData);
  }

  // Delete a task
  deleteTask(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  // Fetch a specific task by ID
  getTaskById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
}

export default new TaskService();
