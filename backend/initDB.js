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

    // Вставляем базовые роли, если их нет
    await db.query(`
      INSERT INTO roles (name)
      SELECT 'Admin' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'Admin');
    `);

    await db.query(`
      INSERT INTO roles (name)
      SELECT 'User' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'User');
    `);

    console.log("Tables created or verified");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

module.exports = initDB;
