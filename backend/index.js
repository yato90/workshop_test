const express = require("express");
const cors = require("cors");
const app = express();
const initDB = require("./initDB");

initDB().catch((err) => {
  console.error("initDB failed:", err);
});

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/roles", require("./routes/roles"));
app.use("/api/tasks", require("./routes/tasks"));

app.listen(port, () => console.log(`Server running on port ${port}`));