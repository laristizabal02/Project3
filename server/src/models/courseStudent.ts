import { DataTypes, type Sequelize, Model } from 'sequelize';
import { CourseStudentAttributes } from '../interfaces/CourseStudent.js';

interface CourseStudentCreationAttributes extends CourseStudentAttributes {
    // No need to extend Optional, as both properties are required
}
class CourseStudent extends Model<CourseStudentAttributes, CourseStudentCreationAttributes> {
    public course_id!: number; // Foreign key to Course
    public student_id!: string; // Foreign key to Student
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function CourseStudentFactory(sequelize: Sequelize): typeof CourseStudent {
    CourseStudent.init(
        {
            course_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'courses', // name of the target model
                    key: 'course_id', // key in the target model that you're referencing
                },
            },
            student_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'students', // name of the target model
                    key: 'student_id', // key in the target model that you're referencing
                },
            },
        },
        {
            tableName: 'coursesStudents',
            sequelize,
        }
    );

    return CourseStudent;
}

export default CourseStudent;