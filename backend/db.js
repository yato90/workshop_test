// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: isProduction ? { rejectUnauthorized: false } : false,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Обычно для Render SSL нужен
  },
});