const router = require("express").Router(); // express router for route creation
let User = require("../models/users.model"); // importing the mongoose model wrt user.

// first route
router.route("/").get((req, res) => {
  User.find() // find is a mongoose method(promise) which will retrieve all the list of users from database
    .then((users) => res.json(users)) // return users from the database
    .catch((err) => res.status(400).json("Error: " + err)); // error message
});

router.route("/add").post((req, res) => {   //route to add username to database
  const username = req.body.username;

  const newUser = new User({       // for new user
    username,
  });

  newUser                                 
    .save()                                     //saving new user
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
