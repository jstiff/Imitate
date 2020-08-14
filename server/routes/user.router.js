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
  const queryString = `
  SELECT  "metrics"."id" AS "metrics_id", "avatar_url", "name", "repo_name", "file_name","time_stamp", "percent_correct", "comments"  FROM "metrics"
  FULL JOIN "chosen_file" ON "metrics"."file_id" = "chosen_file"."id"
  FULL JOIN "repos" ON "chosen_file"."repo_id" = "repos"."id"
  FULL JOIN "fav_coders" ON "repos"."repo_owner" = "fav_coders"."id"
  FULL JOIN "user_favCoder" ON "user_favCoder"."fav_coder_id" = "fav_coders"."id"
  FULL JOIN "user" ON "user_favCoder"."user_id" = "user"."id"
  WHERE "user"."id" = ${req.user.id}
  ;`;
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

router.post("/results", rejectUnauthenticated, async (req, res, next) => {
  const time = moment().format("LLLL");
  const fav_coder = req.body[0];
  const lessonUserId = req.user.id;
  const repos = req.body[1];
  const chosen_file = req.body[2];
  const percent_correct = req.body[3];
  console.log(req.body);
  const connection = await pool.connect();

  try {
    console.log("results", req.body);
    const fav_coder_query = `INSERT INTO fav_coders (name, user_name, avatar_url) VALUES ($1, $2, $3) RETURNING id;`;

    const joinTableQuery = `INSERT INTO  "user_favCoder" (user_id, fav_coder_id) VALUES ($1,$2);`;

    const repo_query = `INSERT INTO repos (repo_name, repo_url, repo_owner) VALUES ($1, $2, $3) RETURNING id;`;

    const chosen_file_query = `INSERT INTO chosen_file (file_name, file_url, repo_id) VALUES ($1, $2, $3) RETURNING id;`;

    const score_query = `INSERT INTO metrics (percent_correct, time_stamp, file_id) VALUES ($1, $2, $3);`;

    const fav_coderInstance = await connection.query(fav_coder_query, [
      fav_coder.name,
      fav_coder.userName,
      fav_coder.avatar_url,
    ]);
    const fav_coderId = fav_coderInstance.rows[0].id;
    await connection.query(joinTableQuery, [lessonUserId, fav_coderId]);
    console.log("Fav_coder", fav_coderId, fav_coderInstance.rows[0].id);
    const repoInstance = await connection.query(repo_query, [
      repos.repo_name,
      repos.repo_url,
      fav_coderId,
    ]);
    const repoId = repoInstance.rows[0].id;
    console.log("REEEPPPPOOOO", repoId);

    const chosen_fileInstance = await connection.query(chosen_file_query, [
      chosen_file.file_name,
      chosen_file.file_url,
      repoId,
    ]);

    const fileId = chosen_fileInstance.rows[0].id;
    await connection.query(score_query, [
      percent_correct.percent_correct,
      time,
      fileId,
    ]);

    await connection.query("COMMIT;");
    res.sendStatus(200);
  } catch (error) {
    console.log("REsults route Failed", error);
    await connection.query("ROLLBACK");
    res.sendStatus(500);
  } finally {
    connection.release();
  }
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
