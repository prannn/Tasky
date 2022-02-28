const mongoose = require("mongoose"); // including mongoose

//making the instance of schema that we can use to add user
const Schema = mongoose.Schema; 

const userSchema = new Schema( 
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema); //converting schema into model 

module.exports = User; 
