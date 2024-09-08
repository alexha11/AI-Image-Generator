import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  love: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const post = mongoose.model("Post", Post);

export default post;