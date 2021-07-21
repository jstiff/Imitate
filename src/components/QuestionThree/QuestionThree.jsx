import React from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Link } from "react-router-dom";


const QuestionThree = () => {


	const repoFiles = useSelector(state => state.treeReducer);
	const dispatch = useDispatch();

	const getRepoContent = (url, type, name, type2) => {
		 dispatch({
		  type: type,
		  payload: url,
		});
		if (type2 === "ADD_TO_TEMP") {
		 dispatch({
		    type: "ADD_TO_TEMP",
		    payload: {
		      file_name: name,
		      file_url: url,
		    },
		  });
		}
	      };

	      return (
		<>
		  <div className="fileTreeWrapper">
		    {repoFiles.data.map((file) => {
		      return file.type === "blob" ? (
			<Link to={"/lesson"}>
			  <div
			    className="blobFile"
			    onClick={() =>
			      getRepoContent(
				file.url,
				"GET_REPO_CONTENT",
				file.path,
				"ADD_TO_TEMP"
			      )
			    }
			  >
			    <h3 className="poop">{file.path}</h3>
			  </div>
			</Link>
		      ) : file.type === "tree" ? (
			<div className="treeFile">
			  <h3
			    className="directoryTitle"
			    onClick={() =>
			      getRepoContent(file.url, "GET_ADDITIONAL_TREE")
			    }
			  >
			    {file.path}
			  </h3>
			</div>
		      ) : null;
		    })}
		  </div>
		</>
	      );

}


export default QuestionThree;