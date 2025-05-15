const db = require("../db");

exports.getAll = async () => {
  const res = await db.query(`
    SELECT tasks.*, users.name AS user_name
    FROM tasks
    LEFT JOIN users ON tasks.user_id = users.id
  `);
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
  return res.rows[0];
};

exports.create = async ({ title, description, user_id }) => {
  await db.query(
    `INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3)`,
    [title, description, user_id]
  );
};

exports.update = async (id, { title, description, user_id }) => {
  await db.query(
    `UPDATE tasks SET title = $1, description = $2, user_id = $3 WHERE id = $4`,
    [title, description, user_id, id]
  );
};

exports.remove = async (id) => {
  await db.query(`DELETE FROM tasks WHERE id = $1`, [id]);
};
