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

  const testGetRepo = `https://api.github.com/repos/jstiff/typing.io-clone/contents/sourceCode.txt?client_id=f00efe0a15d0dd37c99d&client_secret=d4a42f22546157493f204551cbbf9bd`;

  const substack = `https://api.github.com/repos/${req.body.userName}/node-falafel/contents/index.js`;
  // console.log("GitHub router for Api need username", req.body.userName);
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
