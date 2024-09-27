package com.sunbeam.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entities.Task;

@Repository
public interface TaskDao extends JpaRepository<Task, Long>{

}
