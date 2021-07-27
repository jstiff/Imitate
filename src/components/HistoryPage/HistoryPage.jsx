import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Comment from "../Comment/Comment";



const HistoryPage = () => {
        const dispatch = useDispatch();
	const history = useSelector(state => state.historyReducer); 
	const temp = useSelector(state => state.tempReducer[3]);
	const lessonResultData = useSelector(state => state.tempReducer);  

        const sendMetrics = () => {
		dispatch({
		  type: "SEND_LESSON_DATA_TO_SERVER",
		  payload: lessonResultData,
		});
	      };
	    
	const getHistoryData = () => {
		dispatch({ type: "GET_HISTORY" });
	      };
	    
	const deleteLessonHist = (id) => {
		dispatch({
		  type: "DELETE_LESSON_HISTORY",
		  payload: id,
		});
	      };
	    
	const reSetUser = () => {
		dispatch({
		  type: "CLEAR_ON_LOGOUT",
		});
	      };

	      return (
		<div>
		  {!history.loaded ? (
		    <>
		      <div className="scoreContainer">
			<h1 className="historyScore">
			  Great Job! your score was{" "}
			  {temp && temp.percent_correct}%
			</h1>
			<button
			  className="register-form-button-score"
			  onClick={sendMetrics}
			>
			  Add score to history
			</button>
			<button
			  className="register-form-button-score"
			  onClick={getHistoryData}
			>
			  View your past results
			</button>{" "}
		      </div>
		    </>
		  ) : history.loaded ? (
		    <>
		      <div className="historyTitle">
			<h1>These are the repositories you have practiced in the past</h1>
		      </div>
		      <div className="historyTableWrapper">
			<table className="historyTable">
			  <tr>
			    <th>Favorite Programmers</th>
			    <th>Chosen Programmer</th>
			    <th>Repository</th>
			    <th>File in Lesson</th>
			    <th>Date You Practiced</th>
			    <th>Score from lesson</th>
			    <th>Comments</th>
			    <th>edit Comments</th>
			    <th>delete</th>
			  </tr>
			  {history.data.map((score, index) => {
			    return (
			      <tr key={index}>
				<td>
				  <img
				    className="avatar"
				    alt="avatar"
				    src={score.avatar_url}
				  />
				</td>
				<td>{score.name}</td>
				<td>{score.repo_name}</td>
				<td>{score.file_name}</td>
				<td>{score.time_stamp}</td>
				<td>{score.percent_correct}%</td>
				<td>{score.comments}</td>
				<Comment id={score.metrics_id} />
	  
				<td>
				  <button
				    className="historyDelete"
				    onClick={() =>
				      deleteLessonHist(score.metrics_id)
				    }
				  >
				    X
				  </button>
				</td>
			      </tr>
			    );
			  })}
			</table>
		      </div>
		    </>
		  ) : (
		    <p>loading...</p>
		  )}
		</div>
	      );      
}



export default HistoryPage;