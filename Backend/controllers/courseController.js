import Course from "../models/courseSchema.js";

export const createCourse = async (req, res) => {
  try {
    const { filename } = req.file;

    const newCourse = await Course.create({
      ...req.body,
      thumbnail: `uploads/${filename}`,
    });

    res
      .status(201)
      .json({ message: "Course created successfully", data: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create course", error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ date: -1 });
    res.status(200).json({ data: courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch courses", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ data: course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    // If a new file is uploaded, update the thumbnail
    if (req.file) {
      updatedData.thumbnail = `uploads/${req.file.filename}`;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", data: updatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update course", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete course", error: error.message });
  }
};
