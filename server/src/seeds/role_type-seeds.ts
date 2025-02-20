import { Role_type } from '../models/index.js';

export const seedRole_types = async () => {
  // Check if the departments table is empty
  const existingRole_types = await Role_type.findAll();

  if (existingRole_types.length === 0) {
    // Only run the seeding if the table is empty
    await Role_type.bulkCreate(
      [
        { description: 'Instructor' },
        { description: 'Guardian' },
        { description: 'Student' },
      ],
      { individualHooks: true }
    );
    console.log("Role_types seeded successfully.");
  } else {
    console.log("Role_types already exist. Seeding skipped.");
  }

};
