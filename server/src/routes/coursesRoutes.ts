import { Router } from "express";
import { Course } from "../models/course.js"; 
import { Department } from "../models/department.js";

const router = Router();

// Fetch all courses (GET)
router.get("/", async (_, res) => {
  try {
    const courses = await Course.findAll();
    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Add a new course (POST)
router.post("/", async (req, res) => {
  const { title, department_id } = req.body;

  // Validate the input
  if (!title || !department_id) {
    return res.status(400).json({ error: "Title and department_id are required." });
  }

  try {
    // Check if the department exists
    const department = await Department.findByPk(department_id);
    if (!department) {
      return res.status(404).json({ error: "Department not found." });
    }

    // Create the new course
    const newCourse = await Course.create({ title, department_id });

    // Return the newly created course as the response
    return res.status(201).json(newCourse); // Returns only the new course

  } catch (error) {
    console.error("Error adding course:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Update a course (PUT)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required." });
  }

  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    course.title = title;
    await course.save();

    // Optionally, fetch all courses after updating
    const allCourses = await Course.findAll();
    return res.status(200).json(allCourses); // Returns all courses
    // Alternatively, return just the updated course:
    // return res.status(200).json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Delete a course (DELETE)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    await course.destroy();

    // Optionally, fetch all courses after deletion
    const allCourses = await Course.findAll();
    return res.status(200).json(allCourses); // Returns all courses
    // Alternatively, return a success message:
    // return res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;