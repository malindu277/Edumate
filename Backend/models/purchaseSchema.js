import mongoose from "mongoose";
const { Schema } = mongoose;

const purchaseSchema = new Schema({
  courseId: String,
  userId: String,
  purchaseDate: Date,
  expiryDate: Date,
});

export default mongoose.model("Purchase", purchaseSchema);
