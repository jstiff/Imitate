const express = require("express");
const session = require('express-session');
require("dotenv").config();

const app = express();


const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");

const passport = require("./strategies/user.strategy");
const passport_oAuth = require("./strategies/github.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const gitHubRouter = require("./routes/gitHub.router");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// const cors = require('cors')

// const corsOptions = {
//   origin: '*',
// }
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//app.use(cors(corsOptions))
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
//app.use(sessionMiddleware);

// start up passport sessions
// app.use(passport.initialize());
// app.use(passport.session());
 app.use(passport_oAuth.initialize());
 app.use(passport_oAuth.session());

/* Routes */



// app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/gitHub/", gitHubRouter);

// Serve static files
app.use(express.static("build"));



// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
