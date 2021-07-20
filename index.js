const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { customAlphabet } = require("nanoid");
/**
 * Load env variables
 *
 * Based on docs
 * https://www.npmjs.com/package/dotenv
 */
require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.development"),
});

const { pool } = require("./db");
const { CREATE_SHORT_URL, FIND_SHORT_URL } = require("./db/queries");
const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  10
);

const PORT = process.env.PORT || 4000;
const app = express();

// From https://github.com/expressjs/body-parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

app.get("/:short_id", (req, res) => {
  const { short_id: shortId } = req.params;

  if (!shortId) {
    return res.status(404).send({ message: "Not found!" });
  }

  pool.query(FIND_SHORT_URL, [shortId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }

    if (!result.length) {
      return res.status(404).send({ message: "Not found!" });
    }

    res.status(301).redirect(result[0].original_url);
  });
});

app.get("*", (req, res) => {
  res.status(404).send("Not found.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
