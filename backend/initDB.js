const db = require("./db"); // модуль с настройками подключения к PostgreSQL

async function initDB() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role_id INTEGER REFERENCES roles(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        user_id INTEGER REFERENCES users(id)
      );
    `);

    console.log("Tables created or verified");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

module.exports = initDB;
