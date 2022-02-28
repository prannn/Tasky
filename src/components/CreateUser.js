import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  // useState
  const [Username, setUsername] = useState("");

  function onChangeUsername(event) {  //onChange function to enter data in fields
    setUsername(event.target.value);
  }

  function onClickHandler(event) {  //onClick function for submit 
    event.preventDefault();
    const user = { username: Username };
    axios
      .post("http://localhost:5000/users/add", user)
      .then((response) => alert(response.data));
  }

  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6 col-md-3">
          <form>
            <h1 className="text-center">REGISTER</h1>
            <div className=" form-group">
              <label className="form-label fw-bolder">Username:</label>
              <input
                type="username"
                className="form-control"
                onChange={onChangeUsername}
                value={Username}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-dark my-3"
                onClick={onClickHandler}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
