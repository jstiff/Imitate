const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const moment = require("moment");

const router = express.Router();

router.get("/history", rejectUnauthenticated, (req, res) => {
  console.log("inside HISTORY route", req.user);
  const queryString = `SELECT "percent_correct", "time_stamp" FROM "metrics" WHERE "user_id"=${req.user.id};`;
  pool
    .query(queryString)
    .then((result) => {
      console.log("History repsonse", result.rows);
      res.send({
        loaded: true,
        data: result.rows,
      });
    })
    .catch(() => res.sendStatus(500));
});

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const first_name = req.body.first_name;
  const email = req.body.email;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText =
    'INSERT INTO "user" (first_name, email, username, password) VALUES ($1, $2, $3,$4) RETURNING id';
  pool
    .query(queryText, [first_name, email, username, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

router.post("/score", (req, res, next) => {
  const time = moment().format("LLLL");
  const time_stamp = time;
  const percent_correct = req.body.score;
  const user_id = req.user.id;

  const queryText =
    'INSERT INTO "metrics" (time_stamp, percent_correct, user_id) VALUES ($1, $2,$3) RETURNING id';
  pool
    .query(queryText, [time_stamp, percent_correct, user_id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
