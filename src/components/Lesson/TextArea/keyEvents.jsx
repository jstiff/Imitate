import React, { useState} from "react";
import { useSelector} from "react-redux";


// this function will replace 'handleKeyPress()' in TextArea component.
// plan to optimize it and keep it isolatated from the component.


 
const keyEventsHandler = (event, index, lesson, setKeyState, key) => {
		
	
	
    
	if (event.key === lesson.data[index]) {
	  console.log("success");
    
	  setKeyState((prevKeyState) => (
		  { ...prevKeyState, 
	    keyIndex: key.keyIndex + 1,
	    keyValue: true,
	    metrics: {
	      correct: key.metrics.correct + 1,
	      wrong: key.metrics.wrong,
	      lessonLength: lesson.data.length,
	    },
	  }));
	} else if (event.key === "Backspace" || event.key === "Delete") {
	  console.log("backspace");
	  setKeyState((prevKeyState) => ({
		...prevKeyState, 
	    keyIndex: key.keyIndex - 1,
	    keyValue: true,
	  }));
	} else if (
	  event.key === "Return" ||
	  ("Enter" && lesson.data[index] == "\n")
	) {
	  event.preventDefault();
	  setKeyState((prevKeyState) => ({
		...prevKeyState, 
	    keyIndex: key.keyIndex + 1,
    
	    metrics: {
	      correct: key.metrics.correct,
	      wrong: key.metrics.wrong,
	      lessonLength: lesson.length,
	    },
	  }));
	} else if (event.shiftKey && event.key !== lesson.data[index]) {
	  console.log("wrong");
	  setKeyState((prevKeyState)=>({
		  ...prevKeyState,
	    keyValue: false,
	    metrics: {
	      correct: key.metrics.correct,
	      wrong: key.metrics.wrong + 1,
	      lessonLength: lesson.length,
	    },
	  }));
	} else if (event.shiftKey && event.key === lesson.data[index]) {
	  setKeyState((prevKeyState)=> ({
		  ...prevKeyState, 
	    keyIndex: key.keyIndex + 1,
	    keyValue: true,
	    metrics: {
	      correct: key.metrics.correct + 1,
	      wrong: key.metrics.wrong,
	      lessonLength: lesson.data.length,
	    },
	  }));
	} else if (!event.shiftKey && event.key !== lesson.data[index]) {
	  setKeyState((prevKeyState)=>({
		  ...prevKeyState, 
	    keyIndex: key.keyIndex,
	    keyValue: false,
	    metrics: {
	      correct: key.metrics.correct,
	      wrong: key.metrics.wrong + 1,
	      lessonLength: lesson.data.length,
	    },
	  }));
	}
	event.preventDefault();
      };
	      
	 
	 
	 
	 
	 
	 
	 
export default keyEventsHandler;