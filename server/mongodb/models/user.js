import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLenght: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLenght: 3,
  },
  password: {
    type: String,
    required: true,
    minLenght: 5,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

User.plugin(uniqueValidator);

const user = mongoose.model("User", User);

export default user;