require("dotenv").config(); // Обязательно подгрузи .env
const db = require("./db");

(async () => {
  try {
    const res = await db.query("SELECT NOW()");
    console.log("🟢 Успешно подключено к базе данных:", res.rows);
  } catch (err) {
    console.error("🔴 Ошибка подключения к базе данных:", err);
  }
})();
