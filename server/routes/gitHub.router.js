const express = require("express");
const router = express.Router();
const Axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
require("dotenv").config();

router.post("/", rejectUnauthenticated, (req, res) => {
  const userInfo = `https://api.github.com/users/${req.body.userName}?client_id=${process.env.ClIENT_ID}&client_secret=${process.env.GITHUB_KEY}`;

  const repo = `https://api.github.com/users/${req.body.userName}/repos?per_page=5?client_id=${process.env.ClIENT_ID}&client_secret=${process.env.GITHUB_KEY}`;

  // const getRepo = GET /repos/:owner/:repo/contents/:path

  const substack = `https://api.github.com/repos/${req.body.userName}/node-falafel/contents/index.js`;
  // console.log("GitHub router for Api need username", req.body.userName);
  Axios.get(repo)
    .then((response) => {
      // console.log("gitHub RESPONDED!", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("GITHUB API ERROR", err);
      res.sendStatus(500);
    });
});
module.exports = router;
