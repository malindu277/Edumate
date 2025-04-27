import mongoose from "mongoose";

function connectToDb(MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Database connection successful!"))
    .catch((err) => console.log(err));
}

export default connectToDb;
