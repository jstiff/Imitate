
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const pool = require('../modules/pool');




passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GitHubStrategy({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://127.0.0.1:5000/api/user/oauth/github"
  },
  async (accessToken, refreshToken, profile, done) => {
    
    console.log("profile._json", profile._json);
    const userData = profile._json;
    const userArray = [userData.id, userData.avatar_url, userData.name, userData.bio, userData.email, userData.hireable, userData.location ];
    const checkIfExists = `SELECT EXISTS(SELECT 1 FROM "gitHubUser" WHERE "gitHubId" = $1);`; 
    const existingUser = `SELECT * FROM "gitHubUser" WHERE "gitHubUser"."gitHubId" = $1;`;
    
    let user = await pool.query(checkIfExists , [userData.id]);
    
    
    if(!user.rows[0].exists){
	    console.log("IF ! USER")
	    const gitHubQuery1 =`INSERT INTO "gitHubUser" ("gitHubId", "avatar", "name", "bio", "email", "hireable", "location") 
	    VALUES ($1,$2,$3,$4,$5, $6, $7) RETURNING "id";`;
	    const gitHubQuery = `INSERT INTO "gitHubUser" ("gitHubId", "avatar", "name", "bio", "email", "hireable", "location") 
	    VALUES ($1,$2,$3,$4,$5, $6, $7) RETURNING "gitHubId", "avatar", "name", "bio", "email", "hireable", "location"`;
	let userTrue = await pool.query(gitHubQuery1, userArray);
	console.log("RETURNING ID", user.rows[0]);
	
    }else{
	const foundUser = await pool.query(existingUser, [userData.id]);
	done(null, {
		user:foundUser.rows[0],
		accessToken,
		refreshToken
	});

    }
    
  }
));


module.exports = passport;




// else{
// 	const foundUser = await pool.query(existingUser, [userData.id]);
// 	process.nextTick(function () {
// 		console.log("ELSE NEXT TICK", user) 
// 		return done(null, {
// 			user:foundUser.rows[0],
// 			accessToken,
// 			refreshToken
// 		});
// 	      });

//     }