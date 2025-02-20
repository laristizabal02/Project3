import User from './user.js';
import Role_type from './role_type.js';
// Define the one-to-many relationship
User.belongsTo(Role_type, {
  foreignKey: 'role_type_id', // This is the foreign key in the User model
 });

 Role_type.hasMany(User, {
  foreignKey: { 
    name: 'role_type_id',  // This is the foreign key in the User model
  }
 });