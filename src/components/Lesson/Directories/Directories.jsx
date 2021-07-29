import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";



const Directories = () => {
	const dispatch = useDispatch();
	const directoryTree = useSelector(state => state.directoryTreeReducer);
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
		  <div className="directoryFilesWrapper">
		    {directoryTree.data.map((file) => {
		      return (
			<Link to={"/lesson"}>
			  <p
			    onClick={() =>
			      getRepoContent(
				file.url,
				"GET_REPO_CONTENT",
				file.path,
				"ADD_TO_TEMP"
			      )
			    }
			  >
			    {file.path}
			  </p>
			</Link>
		      );
		    })}
		  </div>
		</>
	      );
}

export default Directories;