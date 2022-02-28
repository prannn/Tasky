import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import moment from "moment";


function TaskList() {
  //const [TaskDelete, setTaskDelete] = useState([]);
  const [TasksList, setTasksList] = useState([]);
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then((response) => console.log(response.data));
    window.location.reload(false);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((allTasks) => {
      setTasksList(allTasks.data);
    });
  }, []);

  return ( 
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Task</th>
                <th scope="col">Days</th>
                <th scope="col">Starting on</th>
                <th scope="col">Complete on</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {TasksList.map((task, key) => (
                <tr key={key}>
                  <td>{task.name}</td>
                  <td>{task.task}</td>
                  <td>{task.duration}</td>
                  <td>{moment(task.startdate).format("DD/MM/YYYY")}</td>
                  <td>{moment(task.enddate).format("DD/MM/YYYY")}</td>
                  <td>{task.status}</td>
                  <td>
                    <Link to={`/edit/${task._id}`}>✏️</Link>
                  </td>
                  <td>
                    <IconButton
                      aria-label="delete"
                      size="medium"
                      onClick={() => deleteTask(task._id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    
  );
}

export default TaskList;
