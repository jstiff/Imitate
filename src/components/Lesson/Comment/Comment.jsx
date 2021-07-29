import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";



const Comment = ({id}) => {
	const dispatch = useDispatch();
	const [input, setInput] = useState("");
	const handleChange = (event) => {
		event.preventDefault();
		setInput(event.target.value,)
	      };
	const sendComment = () => {
		dispatch({
		  type: "EDIT_COMMENTS",
		  payload: {
		    comment: input,
		    id: id,
		  },
		});
		setInput("");
	      };

	      return (
		<>
		  <td className="commentContainer">
		    <textarea
		      onChange={handleChange}
		      placeholder="comments"
		      value={input}
		    ></textarea>
		    <button className="comment-button" onClick={sendComment}>
		      Update
		    </button>
		  </td>
		</>
	      );
}



export default Comment;