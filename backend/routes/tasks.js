const router = require("express").Router(); // express router for route creation

let Task = require("../models/tasks.model"); // importing the mongoose model wrt task.

//first route

router.route("/").get((req, res) => {
  Task.find() //find is a mongoose method(promise) which will retrieve all the tasks from database
    .then((tasks) => res.json(tasks)) // return tasks from the database
    .catch((err) => res.status(400).json("Error: " + err)); // error message
});

router.route("/add").post((req, res) => { //route to add tasks to database 
  const name = req.body.name;
  const task = req.body.task;
  const duration = Number(req.body.duration);
  const startdate = Date.parse(req.body.startdate);
  const enddate = Date.parse(req.body.enddate);
  const status = req.body.status;

  const newTask = new Task({     // for new task
    name,
    task,
    duration,
    startdate,
    enddate,
    status,
  });

  newTask                             // saving new task
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {      // route to get task by its id
  Task.findById(req.params.id)
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {    // route to delete task by its id
  Task.findByIdAndDelete(req.params.id)
    .then((tasks) => res.json("task deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {  // route to update task by its id 
  Task.findById(req.params.id)
    .then((tasks) => {
      tasks.name = req.body.name;
      tasks.task = req.body.task;
      tasks.duration = Number(req.body.duration);
      tasks.startdate = Date.parse(req.body.startdate);
      tasks.enddate = Date.parse(req.body.enddate);
      tasks.status = req.body.status;

      tasks                                 // saving the task
        .save()
        .then(() => res.json("Task updated")) // getting response in json format
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
