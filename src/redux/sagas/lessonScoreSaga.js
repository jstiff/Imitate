import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addUserScore(action) {
  try {
    console.log("ADD SCORE", action.payload);
    yield axios.post("/api/user/score", { score: action.payload });
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* addToHistTemp(action) {
  yield put({
    type: "LOAD_INTO_TEMP",
    payload: action.payload,
  });
}

function* lessonScoreSaga() {
  yield takeLatest("ADD_SCORE", addUserScore);
  yield takeLatest("ADD_TO_TEMP", addToHistTemp);
}

export default lessonScoreSaga;
