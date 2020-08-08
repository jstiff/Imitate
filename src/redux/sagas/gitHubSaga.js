import axios from "axios";
//import { response } from "express";
import { put, takeLatest } from "redux-saga/effects";

function* queryForUser(action) {
  try {
    console.log("gitHubSaga ???", action.payload);
    const response = yield axios.post("api/gitHub/", {
      userName: action.payload,
    });
    console.log(" response in gitHubSaga", response.data);
    yield put({
      type: "LOAD_INTO_STORE",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with GitHub user query:", error);
  }
}

function* getUserRepos(action) {
  try {
    console.log("getUser repos Saga has recieved", action.payload);
    const response = yield axios.post("/api/gitHub/repos", {
      userName: action.payload,
    });
    yield put({
      type: "LOAD_REPOS",
      payload: response.data,
    });
  } catch (error) {
    console.log("getUserRepos in gitHubSaga error", error);
  }
}

function* gitHubSaga() {
  yield takeLatest("FETCH_GITHUB_USER", queryForUser);
  yield takeLatest("GET_REPOS", getUserRepos);
}

export default gitHubSaga;
