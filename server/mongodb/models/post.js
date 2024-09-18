import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
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
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
