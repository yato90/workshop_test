const db = require("../db");

exports.getAll = async () => {
  const res = await db.query(`
    SELECT users.*, roles.name AS role_name
    FROM users
    LEFT JOIN roles ON users.role_id = roles.id
  `);
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return res.rows[0];
};

exports.create = async ({ name, email, role_id }) => {
  await db.query(
    `INSERT INTO users (name, email, role_id) VALUES ($1, $2, $3)`,
    [name, email, role_id]
  );
};

exports.update = async (id, { name, email, role_id }) => {
  await db.query(
    `UPDATE users SET name = $1, email = $2, role_id = $3 WHERE id = $4`,
    [name, email, role_id, id]
  );
};

exports.remove = async (id) => {
  await db.query(`DELETE FROM users WHERE id = $1`, [id]);
};
