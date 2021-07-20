const express = require("express");

const db = require("./db");

const PORT = 4000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
