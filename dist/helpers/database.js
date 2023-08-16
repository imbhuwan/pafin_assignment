"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// database.ts
const sequelize_1 = require("sequelize");
// Set your PostgreSQL database configuration
const database_name = process.env.DB_USER;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const sequelize = new sequelize_1.Sequelize(database_name, username, password, {
    host,
    dialect: 'postgres',
});
// Test the database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
exports.default = sequelize;
