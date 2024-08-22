import mongoose from "mongoose";

const countSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Count = mongoose.model("Count", countSchema);

export default Count;
