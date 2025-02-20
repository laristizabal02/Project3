import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

export interface DepartmentAttributes {
  department_id: number;
  department_name: string;
}

interface DepartmentCreationAttributes extends Optional<DepartmentAttributes, 'department_id'> {}

export class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes> implements DepartmentAttributes {
  public department_id!: number;
  public department_name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function DepartmentFactory(sequelize: Sequelize): typeof Department {
  Department.init(
    {
      department_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      department_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'departments',
      sequelize,
    }
  );

  return Department;
}

export default Department;