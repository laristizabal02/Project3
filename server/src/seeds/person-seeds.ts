import { Person } from '../models/index.js';

export const seedPersons = async () => {
  // Check if the persons table is empty
  const existingPersons = await Person.findAll();

  if (existingPersons.length === 0) {
    // Only run the seeding if the table is empty
    await Person.bulkCreate(
      [
        {
          last_name: 'Science',
          first_name: 'George',
          middle_name: 'Bernard',
          personal_title: 'Dr',
          nickname: 'George',
          gender_id: 1,
          birth_date: new Date('1957-08-20'),
          comment_text: 'Department Head',
        },
        {
          last_name: 'Smith',
          first_name: 'Janet',
          personal_title: 'Ms.',
          nickname: 'Jan',
          gender_id: 2,
          birth_date: new Date('1974-10-07'),
          comment_text: 'Billys Mom',
        },
        {
          last_name: 'Smith',
          first_name: 'William',
          personal_title: 'Mr.',
          nickname: 'Billy',
          gender_id: 1,
          birth_date: new Date('2015-03-27'),
          comment_text: 'Good Student',
        },

      ],
      { individualHooks: true }
    );
    console.log("Departments seeded successfully.");
  } else {
    console.log("Departments already exist. Seeding skipped.");
  }

};
