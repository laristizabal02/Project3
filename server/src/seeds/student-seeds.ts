import Student from '../models/student.js';

export const seedsStudents = async () => {
    // Check if the students table is empty
    const existingStudents = await Student.findAll();

    if (existingStudents.length === 0) {
        // Only run the seeding if the table is empty
        await Student.bulkCreate(
            [
                {
                    name: "Laura Aristizabal",
                    grade_name: "Sixth",
                },
                {
                    name: "Steven Gray",
                    grade_name: "Sixth",
                },
                {
                    name: "Salome Palomino",
                    grade_name: "Seventh",
                },
                {
                    name: "Sandra Zuluaga",
                    grade_name: "Seventh",
                },
                {
                    name: "Ana Valencia",
                    grade_name: "Eighth",
                },
                {
                    name: "Laura Alvarez",
                    grade_name: "Eighth",
                },
                {
                    name: "Alejandra Alzate",
                    grade_name: "Ninth",
                },
                {
                    name: "Valeria Garcia",
                    grade_name: "Ninth",
                },
                {
                    name: "Catalina Zuluaga",
                    grade_name: "Tenth",
                },
            ],
            { individualHooks: true }
        );
        console.log("Students seeded successfully.");
    } else {
        console.log("Students already exist. Seeding skipped.");
    }
};
