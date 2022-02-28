import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function CreateTask() {
  // useState 
  const [Task, setTask] = useState("");
  const [Name, setName] = useState("");
  const [TaskDuration, setTaskDuration] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [TaskStatus, setTaskStatus] = useState("Incomplete");

  function onChangeName(event) {  // onChange function to enter data in fields
    setName(event.target.value);
  }

  function onChangeTask(event) {  // onChange function to enter data in fields
    setTask(event.target.value);
  }

  function onChangeTaskDuration(event) {  //onChange function to enter data in fields
    setTaskDuration(event.target.value);
  }

  function onChangeTaskStatus(event) {  //onChange function to enter data in fields
    setTaskStatus(event.target.value);
  }

  function onClickHandler(event) {   //onClick function for submit 
    event.preventDefault();
    const tasks = {
      name: Name,
      task: Task,
      duration: TaskDuration,
      startdate: StartDate,
      enddate: EndDate,
      status: TaskStatus,
    };
    axios                                               // post req using axios to push the task into database
      .post("http://localhost:5000/tasks/add", tasks)
      .then((response) => alert(response.data));

    window.location = "/";
  }

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label className="form-label fw-bolder ">
            Registered Username/Your Name:
          </label>
          <input
            type="text"
            className="form-control"
            value={Name}
            onChange={onChangeName}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bolder">Task:</label>
          <textarea
            className="form-control"
            value={Task}
            onChange={onChangeTask}
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bolder">Duration(in Days):</label>
          <input
            type="number"
            className="form-control"
            value={TaskDuration}
            onChange={onChangeTaskDuration}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bolder">Start Date: </label>
          <div>
            <DatePicker
              selected={StartDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="fw-bolder">End Date: </label>
          <div>
            <DatePicker
              selected={EndDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        <div className="mb-3" value={TaskStatus} onChange={onChangeTaskStatus}>
          <label className="fw-bolder">Task Status: </label>
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            value={TaskStatus}
          >
            <option select>Incomplete</option>
            <option value="1">Complete</option>
          </select>
        </div>
        <button type="submit" className="btn btn-dark" onClick={onClickHandler}>
          Add Task
        </button>
      </form>
    </div>
  );
}
