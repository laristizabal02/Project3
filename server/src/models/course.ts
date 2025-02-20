import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

export interface CourseAttributes {
  course_id: number;
  title: string;
  department_id: number; // Foreign key to departments
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'course_id'> {}

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  public course_id!: number;
  public title!: string;
  public department_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function CourseFactory(sequelize: Sequelize): typeof Course {
  Course.init(
    {
      course_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'courses',
      sequelize,
    }
  );

  return Course;
}

export default Course;