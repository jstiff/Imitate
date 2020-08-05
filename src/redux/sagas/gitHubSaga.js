import axios from "axios";
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

function* gitHubSaga() {
  yield takeLatest("FETCH_GITHUB_USER", queryForUser);
}

export default gitHubSaga;
