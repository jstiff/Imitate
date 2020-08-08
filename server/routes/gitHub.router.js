const express = require("express");
const router = express.Router();
const Axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
require("dotenv").config();

router.post("/repos", rejectUnauthenticated, (req, res) => {
  console.log("REPOS ROUTE", req.body.userName);
  const repos = `https://api.github.com/users/${req.body.userName}/repos?per_page=5?client_id=${process.env.ClIENT_ID}&client_secret=${process.env.GITHUB_KEY}`;

  Axios.get(repos)
    .then((response) => {
      console.log("API REPOS", response.data);
      res.send({
        data: response.data,
        load: true,
      });
    })
    .catch((err) => {
      console.log("GITHUB API ERROR", err);
      res.sendStatus(500);
    });
});
router.post("/", rejectUnauthenticated, (req, res) => {
  const userInfo = `https://api.github.com/users/${req.body.userName}?client_id=${process.env.ClIENT_ID}&client_secret=${process.env.GITHUB_KEY}`;

  const testGetRepo = `https://api.github.com/repos/jstiff/typing.io-clone/contents/sourceCode.txt?client_id=f00efe0a15d0dd37c99d&client_secret=d4a42f22546157493f204551cbbf9bd`;

  const substack = `https://api.github.com/repos/${req.body.userName}/node-falafel/contents/index.js`;

  Axios.get(userInfo)
    .then((response) => {
      console.log("gitHub RESPONDED!", response.data.name);
      res.send({
        success: true,
        data: response.data,
      });
    })
    .catch((err) => {
      console.log("GITHUB API ERROR", err);
      res.sendStatus(500);
    });
});
module.exports = router;
