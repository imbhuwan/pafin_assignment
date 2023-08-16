import { DataTypes, Model} from 'sequelize';
import sequelize from '../helpers/database'; // Import the sequelize instance
import bcrypt from 'bcryptjs';

class User extends Model {
  id!: string;
  name!: string;
  email!: string;
  password!: string;

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

// Hook executed before saving a user
User.addHook('beforeSave', async (user: User) => {
  if (user.changed('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

// Hook executed before updating a user
User.addHook('beforeUpdate', async (user: User) => {
  if (user.changed('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

export default User;
