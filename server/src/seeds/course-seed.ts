import { Course } from '../models/index.js';

export const seedsCourse = async () => {
  // Check if the Courses table is empty
  const existingCourses = await Course.findAll();

  if (existingCourses.length === 0) {
    // Only run the seeding if the table is empty
    await Course.bulkCreate(
      [
        { 
            title: 'Math' , 
            department_id: 1,
        },
        { 
            title: 'Algebra' , 
            department_id: 1,
        },
        { 
            title: 'Trigonometry' , 
            department_id: 1,
        },
        { 
            title: 'Chemistry' , 
            department_id: 2,
        },
        { 
            title: 'Geography' , 
            department_id: 2,
        },
        { 
            title: 'Biology' , 
            department_id: 2,
        },
        { 
            title: 'Painting' , 
            department_id: 3,
        },
        { 
            title: 'Math' , 
            department_id: 3,
        },
        { 
            title: 'Math' , 
            department_id: 3,
        },
      ],
      { individualHooks: true }
    );
    console.log("Courses seeded successfully.");
} else {
  console.log("Courses already exist. Seeding skipped.");
}

  };
  