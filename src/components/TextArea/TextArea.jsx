import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TextArea.css";
import keyEventsHandler from './keyEvents';
import { Link } from "react-router-dom";



const TextArea = () => {
	const lesson = useSelector(state => state.contentReducer);
	const dispatch = useDispatch();

	const [key, setKeyState] = useState({
		keyIndex: 0,
		keyValue: false,
		metrics: {
		  correct: 0,
		  wrong: 0,
		  lessonScore: 0,
		  lessonLength: 0,
		},});

	useEffect(() => {
		document.getElementsByTagName("pre")[0].focus();
		
	}) 
	// setKeyState((prevKeyState)=> (
	// 	{
	// 		...prevKeyState, 
	// 		keyValue:true}));

	const style = {
		height: "auto",
		width: "auto",
		margin: "60px",
		padding: "30px",
	      };
	const styleWrong = {
		fontSize: "24px",
		padding: "3px",
		backgroundColor: "red",
	      };
	const styleCorrect = {
		backgroundColor: "green",
		fontSize: "24px",
		padding: "3px",
		borderRadius: "3px",
	      };
	const styleStart = {
		backgroundColor: "white",
		fontSize: "24px",
		padding: "3px",
	      };
	    
	      

	const answer = () => {
		let { correct } = key.metrics;
		let { wrong } = key.metrics;
		let length = lesson.data.length;
	    
		const results = {
		  percentCorrect: Math.round((parseInt(correct) / length) * 100),
		};
	    
		setKeyState( prevKeyState => (
		     {
			...prevKeyState, 
			metrics: {
			  lessonScore: results.percentCorrect,
			},
		     }
		));
		dispatch({
		  type: "ADD_TO_TEMP",
		  payload: {
		    percent_correct: results.percentCorrect,
		  },
		});
		console.log("BEFORE METRICS SENT");
	};
	// const keyEventsHandler = (event, index) => {
		
	// 	//const lesson = useSelector(state => state.contentReducer);
	// 	console.log("EVENT", event.key);
	    
	// 	if (event.key === lesson.data[index]) {
	// 	  console.log("success");
	    
	// 	  setKeyState((prevKeyState) => (
	// 		  { ...prevKeyState, 
	// 	    keyIndex: key.keyIndex + 1,
	// 	    keyValue: true,
	// 	    metrics: {
	// 	      correct: key.metrics.correct + 1,
	// 	      wrong: key.metrics.wrong,
	// 	      lessonLength: lesson.data.length,
	// 	    },
	// 	  }));
	// 	} else if (event.key === "Backspace" || event.key === "Delete") {
	// 	  console.log("backspace");
	// 	  setKeyState((prevKeyState) => ({
	// 		...prevKeyState, 
	// 	    keyIndex: key.keyIndex - 1,
	// 	    keyValue: true,
	// 	  }));
	// 	} else if (
	// 	  event.key === "Return" ||
	// 	  ("Enter" && lesson.data[index] == "\n")
	// 	) {
	// 	  event.preventDefault();
	// 	  setKeyState((prevKeyState) => ({
	// 		...prevKeyState, 
	// 	    keyIndex: key.keyIndex + 1,
	    
	// 	    metrics: {
	// 	      correct: key.metrics.correct,
	// 	      wrong: key.metrics.wrong,
	// 	      lessonLength: lesson.length,
	// 	    },
	// 	  }));
	// 	} else if (event.shiftKey && event.key !== lesson.data[index]) {
	// 	  console.log("wrong");
	// 	  setKeyState((prevKeyState)=>({
	// 		  ...prevKeyState,
	// 	    keyValue: false,
	// 	    metrics: {
	// 	      correct: key.metrics.correct,
	// 	      wrong: key.metrics.wrong + 1,
	// 	      lessonLength: lesson.length,
	// 	    },
	// 	  }));
	// 	} else if (event.shiftKey && event.key === lesson.data[index]) {
	// 	  setKeyState((prevKeyState)=> ({
	// 		  ...prevKeyState, 
	// 	    keyIndex: key.keyIndex + 1,
	// 	    keyValue: true,
	// 	    metrics: {
	// 	      correct: key.metrics.correct + 1,
	// 	      wrong: key.metrics.wrong,
	// 	      lessonLength: lesson.data.length,
	// 	    },
	// 	  }));
	// 	} else if (!event.shiftKey && event.key !== lesson.data[index]) {
	// 	  setKeyState((prevKeyState)=>({
	// 		  ...prevKeyState, 
	// 	    keyIndex: key.keyIndex,
	// 	    keyValue: false,
	// 	    metrics: {
	// 	      correct: key.metrics.correct,
	// 	      wrong: key.metrics.wrong + 1,
	// 	      lessonLength: lesson.data.length,
	// 	    },
	// 	  }));
	// 	}
	// 	event.preventDefault();
	//       };


	return (
		<>
		  <pre
		    contentEditable={true}
		    suppressContentEditableWarning={true}
		    className="lessonContainer"
		    style={style}
		    onKeyDown={(event) => keyEventsHandler(event, key.keyIndex, lesson, setKeyState, key)}
		  >
		    {lesson.loaded
		      ? lesson.data.map((letter, index) => {
			  return (
			    <span
			      className = "Spans"
			      key={index}
			      style={
				key.keyValue && index === key.keyIndex
				  ? styleCorrect
				  : !key.keyValue && index === key.keyIndex
				  ? styleWrong
				  : styleStart
			      }
			      id={index}
			    >
			      {letter}
			    </span>
			  );
			})
		      : null}
		  </pre>
		  <div className="scoreContainer">
		    <Link to={"/history"}>
		      <button className="register-form-button" onClick={answer}>
			Calculate score!
		      </button>
		    </Link>
		  </div>
		</>
	      );
		
		
	      

}






export default TextArea;