"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../helpers/database")); // Import the sequelize instance
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    async validatePassword(password) {
        return await bcryptjs_1.default.compare(password, this.password);
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'User',
});
// Hook executed before saving a user
User.addHook('beforeSave', async (user) => {
    if (user.changed('password')) {
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        user.password = hashedPassword;
    }
});
// Hook executed before updating a user
User.addHook('beforeUpdate', async (user) => {
    if (user.changed('password')) {
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        user.password = hashedPassword;
    }
});
exports.default = User;
