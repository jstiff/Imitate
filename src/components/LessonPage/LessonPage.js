import React from "react";
import TextArea from "../TextArea/TextArea";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const LessonPage = () => (
  <div>
    <h1>Lesson Page</h1>
    <TextArea />
  </div>
);

// If you needed to add local state or other things,
// you can make it a class component like:

/*
class InfoPage extends React.Component {

  render() {
    return (
      <div>
        <p>Info Page</p>
      </div>
    )
  }
}
*/
export default LessonPage;
