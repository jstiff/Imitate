const startState = {
  isLoggedIn: false,
  user: null,
  client_id: "",
  redirect_uri:"",
  proxy_url: "",
  loaded: false,
  user_data: {}

};



const oAuth_reducer = (state=startState, action) => {
 
	switch (action.type) {
	  case "LOGIN": {
	    localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
	    localStorage.setItem("user", JSON.stringify(action.payload.user))
	    return {
	      ...state,
	      isLoggedIn: action.payload.isLoggedIn,
	      user: action.payload.user
	    };
	  }
	  case "SET_SERVER_DATA":{
	    return {
	      ...state,
	      client_id: action.payload.client_id,
	      redirect_uri: action.payload.redirect_uri,
	      proxy_url: action.payload.proxy_url,
	      loaded: action.payload.loaded 
	    };
      
	  }
	  case "LOGOUT": {
	    localStorage.clear()
	    return {
	      ...state,
	      isLoggedIn: false,
	      user: null
	    };
	  }
	  case "LOAD_GITHUB_USER":{
		  return{
			  ...state,
			  user_data: {
				 ...action.payload
			  }
		  }
	  }
	  default:
	    return state;
	}
      };
      
      export default oAuth_reducer;