import { Router } from "express";
import { Student } from "../models/student.js"; 

const router = Router();

// Fetch all students (GET)
router.get("/", async (_, res) => {
  try {
    const students = await Student.findAll();
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Add a new student (POST)
router.post("/", async (req, res) => {
    const { name, grade_name } = req.body;
  
    if (!name || !grade_name) {
      return res.status(400).json({ error: "Student name and grade_name are required." });
    }
  
    try {
      const newStudent = await Student.create({ name, grade_name });
     // const allStudents = await Student.findAll();
      return res.status(201).json(newStudent);
    } catch (error) {
      console.error("Error adding student:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  });
  

// Update a student (PUT)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, grade_name } = req.body;

  if (!name || !grade_name) {
    return res.status(400).json({ error: "Name and grade are required." });
  }

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    student.name = name;
    student.grade_name = grade_name;
    await student.save();

    // Optionally, fetch all students after updating
    const allStudents = await Student.findAll();
    return res.status(200).json(allStudents); // Returns all courses
    // Alternatively, return just the updated student:
    // return res.status(200).json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Delete a student (DELETE)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    await student.destroy();

    // Optionally, fetch all students after deletion
    const allStudents = await Student.findAll();
    return res.status(200).json(allStudents); // Returns all courses
    // Alternatively, return a success message:
    // return res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;