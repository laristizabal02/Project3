import sequelize from '../config/connection.js'
import { Role_typeFactory } from './role_type.js';
import { PersonFactory } from './person.js';
import { UserFactory } from './user.js';
import { DepartmentFactory } from './department.js';
import { CourseFactory } from './course.js';
import { StudentFactory } from './student.js';

const Role_type = Role_typeFactory(sequelize);
const Person = PersonFactory(sequelize);
const User = UserFactory(sequelize);
const Department = DepartmentFactory (sequelize);
const Course = CourseFactory (sequelize);
const Student = StudentFactory (sequelize);


export { sequelize, Role_type, Person, User, Department, Course, Student  };
