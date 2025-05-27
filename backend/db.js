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
//   connectionString: 'postgresql://workshop_test_user:u3c8WNyzX1gEO01Fmjx1upkfMHozVkP2@dpg-d0iuso3e5dus73a0a2t0-a:5432/workshop_test',
//   ssl: {
//     rejectUnauthorized: false, // для Render нужно
//   },
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };