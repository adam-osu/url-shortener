const express = require("express");
const { customAlphabet } = require("nanoid");

const { pool } = require("./db");
const { CREATE_SHORT_URL } = require("./db/queries");
const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  10
);

const PORT = 4000;
const app = express();

app.post("/shorten", (req, res) => {
  const { original_url: originalUrl } = req.body;

  if (!originalUrl) {
    return res
      .status(400)
      .send({ message: "original_url query param missing!" });
  }

  const shortId = nanoid();
  pool.query(CREATE_SHORT_URL, [shortId, originalUrl], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }
    res.status(200).send({ shortenedUrl: `http://localhost:4000/${shortId}` });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
