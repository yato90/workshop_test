 const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// const pool = new Pool({
//   connectionString: 'postgresql://test_db_m6ft_user:zxF2IhIvze5T1hKhBfoRXPb4pyL2ZALw@dpg-d0qrhpre5dus739rfgsg-a:5432/test_db_m6ft',
//   ssl: {
//     rejectUnauthorized: false, // для Render нужно
//   },
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };