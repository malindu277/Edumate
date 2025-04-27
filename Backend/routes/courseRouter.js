import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("thumbnail"), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", upload.single("thumbnail"), updateCourse);
router.delete("/:id", deleteCourse);

export default router;
