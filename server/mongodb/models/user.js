import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
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
  count : {
    type: Number,
    default: 0,
  },
  lovedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: [],
    },
  ],
  createdPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: [],
    },
  ],
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);

export default User;