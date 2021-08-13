import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("/api/user", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    console.log("Fetch SAGA", response.data);
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* getHistory(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    console.log("History GET");
    const response = yield axios.get("/api/user/history");

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "LOAD_HISTORY_INTO_STATE", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}
function* sendLessonResults(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    console.log("FART", action.payload);
    const response = yield axios.post(
      "/api/user/results",
      action.payload,
      config
    );
  } catch (error) {
    console.log("Lesson results POST failed", error);
  }
}

function* deleteLesson(action) {
  try {
    console.log("DELETE Saga poop", action.payload);
    yield axios.delete(`/api/user/history/${action.payload}`);
    yield put({ type: "GET_HISTORY" });
  } catch (error) {
    console.log("User get request failed", error);
  }
}
function* editComments(action) {
  try {
    console.log("DELETE Saga poop", action.payload);
    yield axios.put(`/api/user/history/${action.payload.id}`, {
      data: action.payload.comment,
    });
    yield put({ type: "GET_HISTORY" });
    //yield put({ type: "GET_HISTORY" });
  } catch (error) {
    console.log("User get request failed", error);
  }
}
function* oAuth_fetch(action) {
  try {
    console.log("inside oAuth_fetch saga");
    const response = yield axios.get("http://localhost:5000/authenticate");
    yield console.log("oauth saga response", response.data);
    yield put({ type: "LOAD_GITHUB_USER", payload: response.data });
  } catch (error) {
    console.log("ERROR oAuth_fetch SAGA", error);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeLatest("GET_HISTORY", getHistory);
  yield takeLatest("SEND_LESSON_DATA_TO_SERVER", sendLessonResults);
  yield takeLatest("DELETE_LESSON_HISTORY", deleteLesson);
  yield takeLatest("EDIT_COMMENTS", editComments);
  yield takeLatest("FETCH_TO_AUTHORIZE", oAuth_fetch);
}

export default userSaga;
