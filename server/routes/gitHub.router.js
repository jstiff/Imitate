const express = require("express");
const router = express.Router();
const Axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
require("dotenv").config();

router.post("/content", rejectUnauthenticated, (req, res) => {
  console.log("BEFORE aXIOS ", req.body.url);
  const content_url = `${req.body.url}?client_id=${process.env.ClIENT_ID}&client_secret=${process.env.GITHUB_KEY}`;

  Axios.get(content_url)
    .then((response) => {
      console.log("content response", response.data);
      // const buffer = new Buffer.from(response.data.content, "base64");
      // const lessonText = buffer.toString("ascii");
      // console.log(lessonText);
      res.send({
        loaded: true,
        data: response.data,
      });
    })
    .catch((err) => {
      console.log("error in AXIOS_CONTENT", err);
    });
});

router.post("/tree", rejectUnauthenticated, (req, res) => {
  const tree = `https://api.github.com/repos/${req.body.userName}/${req.body.repoName}/git/trees/master?client_id=${process.env.ClIENT_ID}&client_secret=${process.env.GITHUB_KEY}`;

  Axios.get(tree)
    .then((response) => {
      console.log("API REPOS", response.data.tree);
      res.send({
        loaded: true,
        data: response.data.tree,
      });
    })
    .catch((err) => {
      console.log("GITHUB API ERROR", err);
      res.sendStatus(500);
    });
});

router.post("/repos", rejectUnauthenticated, (req, res) => {
  console.log("REPOS ROUTE", req.body.userName);
  const repos = `https://api.github.com/users/${req.body.userName}/repos?per_page=5?client_id=${process.env.ClIENT_ID}&client_secret=${process.env.GITHUB_KEY}`;

  const blob = `https://api.github.com/repos/${req.body.userName}/typing.io-clone/git/blobs/7ae08b964fe2c5511247fabf033f5f8b937abde6?client_id=f00efe0a15d0dd37c99d&client_secret=d4a42f22546157493f204551cbbf9bd`;

  Axios.get(repos)
    .then((response) => {
      console.log("API REPOS", response.data);
      res.send({
        data: response.data,
        loaded: true,
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

  const blob = `https://api.github.com/repos/${req.body.userName}/typing.io-clone/git/blobs/7ae08b964fe2c5511247fabf033f5f8b937abde6?client_id=f00efe0a15d0dd37c99d&client_secret=d4a42f22546157493f204551cbbf9bd`;

  Axios.get(userInfo)
    .then((response) => {
      console.log("gitHub RESPONDED!", response.data.name);
      res.send({
        loaded: true,
        data: response.data,
      });
    })
    .catch((err) => {
      console.log("GITHUB API ERROR", err);
      res.sendStatus(500);
    });
});
module.exports = router;
