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
      type: "LOAD_USER_STATE",
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
      type: "LOAD_REPOS_INTO_STATE",
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
    console.log("TREE", response.data.data);
    yield put({
      type: "LOAD_TREE_INTO_STATE",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error in GetREPO TREE", error);
  }
}

function* getRepoContent(action) {
  console.log("GET CONTENT", action.payload);
  const response = yield axios.post("/api/gitHub/content", {
    url: action.payload,
  });
  yield put({
    type: "LOAD_CONTENT_INTO_STATE",
    payload: response.data,
  });
}

function* gitHubSaga() {
  yield takeLatest("FETCH_GITHUB_USER", queryForUser);
  yield takeLatest("GET_REPOS", getUserRepos);
  yield takeLatest("GET_REPO_TREE", getRepoTree);
  yield takeLatest("GET_REPO_CONTENT", getRepoContent);
}

export default gitHubSaga;
