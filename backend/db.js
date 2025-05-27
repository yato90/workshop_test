 const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: isProduction ? { rejectUnauthorized: false } : false,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };

const pool = new Pool({
  connectionString: 'postgresql://work_db_u963_user:tIG4Pcz6q4keJEPv9QdoZFLiALzIj9LI@dpg-d0qu69umcj7s73edldn0-a:5432/work_db_u963',
  ssl: {
    rejectUnauthorized: false, // для Render нужно
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};