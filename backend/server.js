// server.js

require("dotenv").config();

const connectDB = require("./config/db");

const app = require("./src/app");
const port = 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
