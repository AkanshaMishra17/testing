import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Routes,router} from 'react-router';
function App() {
  return (
    <div className='container'>
      
      <Routes>
      <Route path="/" element={<TaskList/>}/>
      <Route path="/newTask" element={<TaskForm/>}/> 
      </Routes>
    
     
      
    </div>
  );
}

export default App;
