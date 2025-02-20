import { User } from '../models/index.js';

export const seedUsers = async () => {
  // Check if the users table is empty
  const existingUsers = await User.findAll();

  if (existingUsers.length === 0) {
    // Only run the seeding if the table is empty
    await User.bulkCreate(
      [
        {
          username: 'Dr.Science',
          email: 'dr.science@school.com',
          password: 'password',
          role_type_id: 1, // Instructor
        },
        {
          username: 'SuperMom',
          email: 'SuperMom@parents.com',
          password: 'password',
          role_type_id: 2, //Guardian
        },
        {
          username: 'SchoolBoy',
          email: 'SchoolBoy@students.com',
          password: 'password',
          role_type_id: 3, // Student
        },
      ],
      { individualHooks: true }
    );
    console.log("Users seeded successfully.");
  } else {
    console.log("Users already exist. Seeding skipped.");
  }
};
