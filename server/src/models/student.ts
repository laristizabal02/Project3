import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

import {StudentAttributes} from '../interfaces/Student.js';


interface StudentCreationAttributes extends Optional<StudentAttributes, 'student_id'> { }

export class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
    public student_id!: number;
    public name!: string;
    public grade_name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date; 
}

export function StudentFactory(sequelize: Sequelize): typeof Student {
    Student.init(
        {
            student_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
           grade_name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: 'students',
            sequelize,
        }
    );

    return Student;
}

export default Student;