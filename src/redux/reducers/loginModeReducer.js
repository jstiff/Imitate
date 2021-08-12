
// const startState = {
//   isLoggedIn: false,
//   user: null,
//   client_id: "",
//   redirect_uri:"",
//   client_secret: "",
//   proxy_url: "",
//   loaded: false

// };

const loginMode = (state=null, action) => {
 
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
        client_secret: action.payload.client_secret,
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
    default:
      return state;
  }
};

export default loginMode;


//  const loginMode = (state = 'home', action) => {
//     switch (action.type) {
//       case 'SET_TO_LOGIN_MODE':
//         return 'login';
//       case 'SET_TO_REGISTER_MODE':
//         return 'register';
//       default:
//         return state;
//     }
//   };

// // loginMode will be on the redux state at:
// // state.loginMode
  
  