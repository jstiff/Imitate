const express = require("express");
const router = express.Router();
const Axios = require("axios");
require("dotenv").config();

router.post("/", (req, res) => {
  console.log("GitHub router for Api need username", req.body.userName);
  Axios.get(
    `https://api.github.com/users/${req.body.userName}?client_id=${process.env.ClIENT_ID}&client_secret=${process.env.GITHUB_KEY}`
  )
    .then((response) => {
      console.log("gitHub RESPONDED!", response.data.location);
      res.send(response.data.location);
    })
    .catch((err) => {
      console.log("GITHUB API ERROR", err);
      res.sendStatus(500);
    });
});
module.exports = router;
