import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditTask() {
  const [Name, setName] = useState("");
  const [Task, setTask] = useState("");
  const [TaskDuration, setTaskDuration] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [TaskStatus, setTaskStatus] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`).then((response) => {
      setName(response.data.name);
      setTask(response.data.task);
      setTaskDuration(response.data.duration);
      setStartDate(new Date(response.data.startdate));
      setEndDate(new Date(response.data.enddate));
      setTaskStatus(response.data.status);
    });
  }, [id]);

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeTask(event) {
    setTask(event.target.value);
  }

  function onChangeTaskDuration(event) {
    setTaskDuration(event.target.value);
  }

  function onChangeTaskStatus(event) {
    setTaskStatus(event.target.value);
  }

  function onClickHandler(event) {
    event.preventDefault();
    const tasks = {
      name: Name,
      task: Task,
      duration: TaskDuration,
      startdate: StartDate,
      enddate: EndDate,
      status: TaskStatus,
    };
    axios
      .post(`http://localhost:5000/tasks/update/${id}`, tasks)
      .then((response) => console.log(response.data));

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
          <label className="form-label fw-bolder ">Task:</label>
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
            <option>Complete</option>
          </select>
        </div>
        <button type="submit" className="btn btn-dark" onClick={onClickHandler}>
          Update Task
        </button>
      </form>
    </div>
  );
}
