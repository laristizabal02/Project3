import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
import {PersonAttributes} from '../interfaces/Person.js';

interface PersonCreationAttributes extends Optional<PersonAttributes, 'person_id'> { }

export class Person extends Model<PersonAttributes, PersonCreationAttributes> implements PersonAttributes {
    public person_id!: number;
    public last_name!: string;
    public first_name!: string;
    public middle_name!: string;
    public personal_title!: string;
    public suffix!: string;
    public nickname!: string;
    public gender_id!: number; // Use definite assignment assertion
    public birth_date!: Date;
    public comment_text!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    constructor(init?: PersonCreationAttributes) {
        super(init); // Use PersonCreationAttributes type
        if (init) {
        }
    }

}

export function PersonFactory(sequelize: Sequelize): typeof Person {
    Person.init(
        {
            person_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            middle_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            personal_title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            suffix: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            gender_id: {
                type: DataTypes.INTEGER, // Use DataTypes here
                allowNull: false
            },
            birth_date: {
                type: DataTypes.DATE, // Use DataTypes here
                allowNull: false
            },
            comment_text: {
                type: DataTypes.STRING, // Use DataTypes here
                allowNull: true
            }
        },
        {
            tableName: 'persons',
            sequelize
        }
    );

    return Person;
} 
export default Person;