import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "draft",
  },
  author: {
    type: String,
    default: "Brian Fox",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Article = mongoose.model("Article", articleSchema);
