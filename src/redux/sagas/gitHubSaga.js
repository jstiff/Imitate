import axios from "axios";
//import { response } from "express";
import { put, takeLatest } from "redux-saga/effects";

function* queryForUser(action) {
  try {
    const config = {
      headers: { Accept: "application/vnd.github.v3+json " },
    };
    console.log("gitHubSaga ???", action.payload);
    const response = yield axios.post(
      "api/gitHub/",
      {
        userName: action.payload,
      },
      config
    );
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
    const config = {
      headers: { Accept: "application/vnd.github-blob.raw" },
    };
    console.log("getUser repos Saga has recieved", action.payload, config);
    const response = yield axios.post("/api/gitHub/repos", {
      userName: action.payload,
    });
    console.log("Blob-raw", response);
    yield put({
      type: "LOAD_REPOS",
      payload: response.data,
    });
  } catch (error) {
    console.log("getUserRepos in gitHubSaga error", error);
  }
}
function* getRepoTree(action) {
  try {
    console.log("REPO TREE", action.payload);
    const response = yield axios.post("/api/gitHub/tree", action.payload);
    yield put({
      type: "LOAD_TREE",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error in GetREPO TREE", error);
  }
}

function* gitHubSaga() {
  yield takeLatest("FETCH_GITHUB_USER", queryForUser);
  yield takeLatest("GET_REPOS", getUserRepos);
  yield takeLatest("GET_REPO_TREE", getRepoTree);
}

export default gitHubSaga;
