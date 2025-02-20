import { Department } from '../models/index.js';

export const seedsDepartment = async () => {
  // Check if the departments table is empty
  const existingDepartments = await Department.findAll();

  if (existingDepartments.length === 0) {
    // Only run the seeding if the table is empty
    await Department.bulkCreate(
      [
        { department_name: 'Math' },
        { department_name: 'Science' },
        { department_name: 'Art' },
      ],
      { individualHooks: true }
    );
    console.log("Departments seeded successfully.");
  } else {
    console.log("Departments already exist. Seeding skipped.");
  }
};