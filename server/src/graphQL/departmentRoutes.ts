import express from 'express';
import { Department } from '../models/department.js'; // Adjust path as necessary

const router = express.Router();

// GET all departments
router.get('/', async (_, res) => {
  try {
    const departments = await Department.findAll(); // Adjust if using other ORM methods
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

export default router;