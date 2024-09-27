package com.sunbeam.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.TaskDao;
import com.sunbeam.entities.Task;

@Service
public class TaskService {

    @Autowired
    private TaskDao taskDao;

    public List<Task> getAllTasks() {
        return taskDao.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskDao.findById(id);
    }

    public Task createTask(Task task) {
        return taskDao.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        return taskDao.findById(id).map(task -> {
            task.setAssignedTo(updatedTask.getAssignedTo());
            task.setStatus(updatedTask.getStatus());
            task.setDueDate(updatedTask.getDueDate());
            task.setPriority(updatedTask.getPriority());
            task.setDescription(updatedTask.getDescription());
            return taskDao.save(task); // Changed from taskRepository to taskDao
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id) {
        taskDao.deleteById(id);
    }
}
