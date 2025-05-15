const db = require("../db");

exports.getAll = async () => {
  const res = await db.query(`SELECT * FROM roles`);
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query(`SELECT * FROM roles WHERE id = $1`, [id]);
  return res.rows[0];
};

exports.create = async ({ name }) => {
  await db.query(`INSERT INTO roles (name) VALUES ($1)`, [name]);
};

exports.update = async (id, { name }) => {
  await db.query(`UPDATE roles SET name = $1 WHERE id = $2`, [name, id]);
};

exports.remove = async (id) => {
  await db.query(`DELETE FROM roles WHERE id = $1`, [id]);
};
