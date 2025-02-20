import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  user_id: number;
  username: string;
  password: string;
  email: string;
  role_type_id: number;
  //person_id: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public role_type_id!: number; // Use definite assignment assertion
  //public person_id!: number; // Use definite assignment assertion
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(init?: UserCreationAttributes) {
    super(init); // Use UserCreationAttributes type
    if (init) {
      this.role_type_id = init.role_type_id || 0; // Default value if not provided
      //this.person_id = init.person_id || 0; // Default value if not provided
    }
  }

  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'role_types', // name of the target model
          key: 'role_type_id', // key in the target model that you're referencing
        },
      },
      /* person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'persons', // name of the target model
          key: 'person_id', // key in the target model that you're referencing
        },
      }, */
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password);
        },
      }
    }
  );

  return User;
}
export default User;