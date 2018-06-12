import { fork, all } from "redux-saga/effects";
import {watchGetInputs} from "@app/containers/Inputs/saga";
import {watchInputChange} from "@app/containers/Inputs/saga";

export function* rootSaga() {
  yield all([
    fork(watchGetInputs),
    fork(watchInputChange),
  ]);
}
