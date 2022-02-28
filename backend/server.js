const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbname = "myDatabase";

//require("dotenv").config(); // for environments variables

const app = express();
//const port = process.env.port || 5000; // for creating the express server

app.use(cors()); // middleware to allow us to parse json bcoz our server,
app.use(express.json()); //will be sending and recieving json

//const uri = process.env.ATLAS_URI; // database uri
mongoose.connect(
  `mongodb+srv://dbUser:user123@cluster0.jfffx.mongodb.net/dbname?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection successful");
});

const tasksRouter = require("./routes/tasks"); // importing routes from routes folder wrt tasks
const usersRouter = require("./routes/users"); // importing routes from users folder wrt users

app.use("/tasks", tasksRouter); // using the routes eg. if we visit /tasks then it'll load tasks info
app.use("/users", usersRouter); // using the routes eg. if we visit /users then it'll load users info

app.listen(5000, () => {
  console.log(`Server is running on port: 5000`);
}); // starts the server on given port
