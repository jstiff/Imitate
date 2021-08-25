// No changes should be required in this file

const session = require("express-session");
const warnings = require("../constants/warnings");
const session_pool = require("./pool");
//const pgSession = require("connect-pg-simple")(session);
const cookieSession = require("cookie-session");

/*
  The cookie session makes it so a user can enters their username and password one time,
  and then we can keep them logged in. We do this by giving them a really long random string
  that the browser will pass back to us with every single request. The long random string is
  something the server can confirm, and then we know that we have the right user.

  You can see this string that gets passed back and forth in the
  `application` ->  `storage` -> `cookies` section of the chrome debugger
*/

const serverSessionSecret = () => {
  if (
    !process.env.SERVER_SESSION_SECRET ||
    process.env.SERVER_SESSION_SECRET.length < 8 ||
    process.env.SERVER_SESSION_SECRET === warnings.exampleBadSecret
  ) {
    // Warning if user doesn't have a good secret
    console.log(warnings.badSecret);
  }

  return process.env.SERVER_SESSION_SECRET;
};
const IN_PRODUCTION = process.env.NODE_ENV === "production";

// module.exports = session({
//   secret: serverSessionSecret() || "poopie secret",
//   resave: false,
//   saveUninitialized: false,
//   // store: new pgSession({
//   //   pool: session_pool,
//   //   tableName: "session_user",
//   //   conString: "postgres://postgres:postgres@localhost:5432/imitate_app",
//   // }),
//   cookie: {
//     secure: IN_PRODUCTION,
//     httpOnly: true,
//     sameSite: true,
//     maxAge: 1000 * 60 * 60 * 1,
//   },
// });

module.exports = cookieSession({
  secret: serverSessionSecret() || "secret", // please set this in your .env file
  key: "imitate_user", // this is the name of the req.variable. 'user' is convention, but not required
  resave: "false",
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000, // Set to 1 hour - 60 min/hour * 60 s/min * 1000 ms/s
  secure: IN_PRODUCTION,
});
