import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import CreateUser from "./components/CreateUser";
import EditTask from "./components/EditTask";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";



function App() {
     
  return (  
    <Router>
      <Navbar />
      <br />
     <Routes>
       <Route path="/" element={<TaskList/>} />
       <Route path="/edit/:id" element={<EditTask/>} />
       <Route path="/create" element={<CreateTask/>} />
       <Route path="/user" element={<CreateUser/>} />
     </Routes>
      
    </Router>
    
  );
}

export default App;
