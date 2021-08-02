
const providers = ['github' ];


const callbacks = providers.map(provider => {
	return process.env.NODE_ENV === 'production'
	  ? `https://imit8.herokuapp.com/${provider}/callback`
	  : `https://localhost:5000/api/user/oauth/${provider}`
      })
      
const [githubURL] = callbacks


exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'https://imit8.netlify.com'
  : ['https://127.0.0.1:3000']


  
exports.GITHUB_CONFIG = {
	
	clientID: process.env.GITHUB_KEY,
	clientSecret: process.env.GITHUB_SECRET,
	callbackURL: githubURL
      }