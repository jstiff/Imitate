import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const QuestionTwo = () => {
	const dispatch = useDispatch();
        const gitHub = useSelector(state => state.apiReducer);
  	const userRepos = useSelector(state => state.reposReducer);

	const grabTree = (event, repo, id, url) => {
		dispatch({
		  type: "GET_REPO_TREE",
		  payload: {
		    userName: gitHub.data.login,
		    repoName: repo,
		  },
		});
		dispatch({
		  type: "ADD_TO_TEMP",
		  payload: {
		    repo_name: repo,
		    repo_id: id,
		    repo_url: url,
		  },
		});
	      };

	  return (
		<>
		  <div className="avatarWithTitle">
		    <img className="avatar" src={gitHub.data.avatar_url} />
		  </div>
		  {/* className="repoGrid" */}
		  <div className="repositoryContainer">
		    <table className="historyTable">
		      <tr>
			<th>Repository Name</th>
			<th>Description</th>
			<th>Language Used</th>
			<th>Date last updated</th>
		      </tr>
		      {userRepos.data.map((repo, index) => {
			return (
			  <tr>
			    <td>
			      <h3
				className="repoLink"
				onClick={(event) =>
				  grabTree(event, repo.name, repo.id, repo.blobs_url)
				}
			      >
				{repo.name}
			      </h3>
			    </td>
			    <td>
			      {repo.description ? (
				<p>{repo.description}</p>
			      ) : (
				<p>No description provided</p>
			      )}
			    </td>
			    <td>
			      {repo.language ? (
				<p>Mostly written in {repo.language}</p>
			      ) : (
				<p>No Language was determined</p>
			      )}
			    </td>
			    <td>
			      <p>Repo last updated {repo.updated_at}</p>
			    </td>
			  </tr>
			);
		      })}
		    </table>
		  </div>
		</>
	      );

}




export default QuestionTwo;