// database.ts
import { Sequelize } from 'sequelize';
// Set your PostgreSQL database configuration
const database_name = <string>process.env.DB_USER
const username = <string>process.env.DB_USER
const password = <string>process.env.DB_PASSWORD
const host = <string>process.env.DB_HOST

const sequelize = new Sequelize(database_name, username, password, {
  host,
  dialect: 'postgres',
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
