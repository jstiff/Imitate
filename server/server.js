require("dotenv").config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");
const passport_oAuth = require("./strategies/github.strategy");

//Route includes
const userRouter = require("./routes/user.router");
const gitHubRouter = require("./routes/gitHub.router");
const oAuthRouter = require("./routes/oAuth.router");

const corsOptions = {
  credentials: true, 
  origin: 'http://localhost:3000',
}


app.set("trust proxy", 1);
//app.use(cors(corsOptions));







// Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


//Passport Session Configuration //

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport_oAuth.initialize());
app.use(passport_oAuth.session());



//app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/gitHub/", gitHubRouter);
app.use("/authenticate", oAuthRouter);

//Serve static files
app.use(express.static("build"));



// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
