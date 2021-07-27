switch (event.key) {
      case (lesson.data[index]):
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
	case ("Backspace" || event.key === "Delete"):
		setKeyState((prevKeyState) => ({
			...prevKeyState, 
		    keyIndex: key.keyIndex - 1,
		    keyValue: true,
		  }));
        case (
		 "Return" ||
		("Enter" && lesson.data[index] == "\n")
	      ):event.preventDefault();
	      setKeyState((prevKeyState) => ({
		    ...prevKeyState, 
		keyIndex: key.keyIndex + 1,
	
		metrics: {
		  correct: key.metrics.correct,
		  wrong: key.metrics.wrong,
		  lessonLength: lesson.length,
		},
	      }));
	default: alert("POOP");

	}