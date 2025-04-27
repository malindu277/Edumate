import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: String,
  thumbnail: String,
  description: String,
  videos: [{ topic: String, link: String }],
  price: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema);
