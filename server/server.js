require("dotenv").config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const authRouter = require('./lib/auth.router');
const passportInit = require('./lib/passport.init');
const { SERVER_SESSION_SECRET, CLIENT_ORIGIN } = require('./config');






const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");

const passport = require("./strategies/user.strategy");
const passport_oAuth = require("./strategies/github.strategy");

//Route includes
const userRouter = require("./routes/user.router");
const gitHubRouter = require("./routes/gitHub.router");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Passport Session Configuration //
app.use(sessionMiddleware);
 app.use(passport_oAuth.initialize());
 app.use(passport_oAuth.session());



app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/gitHub/", gitHubRouter);

//Serve static files
app.use(express.static("build"));



// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
