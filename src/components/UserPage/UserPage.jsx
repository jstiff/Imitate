import React from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionOne from "../QuestionOne/QuestionOne";
import QuestionTwo from "../QuestionTwo/QuestionTwo";
import QuestionThree from "../QuestionThree/QuestionThree";
import SearchUser from "../SeachUser/SearchUser";
import Directories from "../Directories/Directories";




const UserPage = () => {
	//const dispatch = useDispatch();
	const gitHubUser = useSelector(state => state.apiReducer); 
  	const userRepos =  useSelector(state => state.reposReducer);
  	const repoFiles =  useSelector(state => state.treeReducer);
  	const directoryTree = useSelector(state => state.directoryTreeReducer); 

	

	      return (
		<>
		  {directoryTree.loaded &&
		  gitHubUser.loaded &&
		  userRepos.loaded &&
		  repoFiles.loaded ? (
		    <>
		      <Directories />
		    </>
		  ) : gitHubUser.loaded &&
		    userRepos.loaded &&
		    repoFiles.loaded ? (
		    <>
		      <QuestionThree />
		    </>
		  ) : gitHubUser.loaded &&
		    userRepos.loaded &&
		    !repoFiles.loaded ? (
		    <QuestionTwo />
		  ) : gitHubUser.loaded &&
		    !userRepos.loaded &&
		    !repoFiles.loaded ? (
		    <QuestionOne />
		  ) : (
		    <SearchUser />
		  )}
		</>
	      );
}



export default UserPage;