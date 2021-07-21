import React from 'react';
import { useDispatch, useSelector } from 'react-redux';



const QuestionOne = () => {
	const dispatch = useDispatch();
        const store = useSelector(store => store);
	const user = useSelector(state => state.user);
        const gitHub = useSelector(state => state.apiReducer); 
	
	const viewRepos = () => {
		dispatch({
		  type: "GET_REPOS",
		  payload: gitHub.data.login,
		});
		dispatch({
		  type: "ADD_TO_TEMP",
		  payload: {
		    name: gitHub.data.name,
		    userName: gitHub.data.login,
		    avatar_url: gitHub.data.avatar_url,
		  },
		});
	      };
	
	    const  reSetUser = () => {
		dispatch({
			type: "CLEAR_ON_LOGOUT",
			});
		};

	     return (
		<div className="gitHubCard">
		  <img className="avatar" src={gitHub.data.avatar_url} />
		  <h2>
		    {gitHub.data.name}{" "}
		    {gitHub.data.company !== null
		      ? ` works for ${gitHub.data.company} and `
		      : null}
		    has {gitHub.data.public_repos} repositories to view. Would
		    you like to check any out?
		  </h2>
		  <div className="QuestionOneBtns">
		    <button onClick={viewRepos} className="register-form-button">
		      yes
		    </button>
	  
		    <button onClick={reSetUser} className="register-form-button">
		      No thanks
		    </button>
		  </div>
		</div>
	      );
	    

}




export default QuestionOne;