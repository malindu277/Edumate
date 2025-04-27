//Load env variables
import "dotenv/config";

// import dependancies
import express from "express";
import cors from "cors";
import connectToDb from "./config/connectToDb.js";
import courseRouter from "./routes/courseRouter.js";
import purchaseRouter from "./routes/purchaseRouter.js";
import path from "path";
import { fileURLToPath } from "url";

// create express app
const app = express();

// configure express app
app.use(express.json());

// Enable CORS
app.use(cors());

// connect to database
connectToDb(process.env.MONGODB_URI);

// Routing
app.get("/", (_, res) => {
  res.status(200).send("Education API is running");
});

// Serve static files from the uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "uploads", filename));
});

app.use("/api/courses", courseRouter);
app.use("/api/purchases", purchaseRouter);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}.`));
